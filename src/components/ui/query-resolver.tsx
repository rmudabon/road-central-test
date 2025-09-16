import type { DefaultError, UseQueryResult } from "@tanstack/react-query";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

const DefaultLoadingElement = () => {
  return (
    <div className="relative">
      <CircularProgress />
    </div>
  );
};

type ResolveStrategy = "default" | "stale-while-revalidate";
const STRATEGY_CONDITIONS: Record<
  ResolveStrategy,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Query extends UseQueryResult>(q: Query) => boolean
> = {
  default: (q) => !q.isFetching,
  "stale-while-revalidate": () => true,
};

/**
 * Query Resolver automatically handles the UI updates from react-query requests.
 *
 *
 * @component
 * @example
 * ```tsx
 * const query = useQuery()
 * <QueryResolver query={query}>
 * {
 * (children) => // React Components using children
 * }
 * </QueryResolver>
 * ```
 */
export default function QueryResolver<
  T extends UseQueryResult,
  TData = T["data"],
>({
  children,
  strategy = "stale-while-revalidate",
  query,
  onRefetch: onRefetchHandler = query.refetch,
  loadingElement = <DefaultLoadingElement />,
  errorElement = null,
  uninitializedElement = null,
}: {
  query: T;
  strategy?: ResolveStrategy;
  children: ((d: NonNullable<TData>) => React.ReactNode) | React.ReactNode;
  onRefetch?: () => void;
  loadingElement?: React.ReactNode;
  errorElement?: ((error: DefaultError) => React.ReactNode) | React.ReactNode;
  uninitializedElement?: React.ReactNode;
}) {
  const resolveCondition = STRATEGY_CONDITIONS[strategy](query);

  if (query.isPaused) {
    return <>{uninitializedElement}</>;
  }

  if (query.isError) {
    console.log(query.error.message);
    if (errorElement !== null) {
      return (
        <>
          {typeof errorElement === "function"
            ? errorElement(query.error)
            : errorElement}
        </>
      );
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        paddingX={2}
        paddingY={8}
      >
        <Box>
          <Typography variant="h4" color="red">
            Error
          </Typography>
          <Typography sx={{ marginTop: 2 }}>
            Failed to load data. Try again.
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Button
            disableElevation
            onClick={onRefetchHandler}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  /**
   *
   * In the future we can consolidate this behavior to a prop to
   * choose if we want to show the cached data while fetching a new one
   * or show the loading element when the query is fetching.
   */
  if (query.isSuccess && resolveCondition && query.data !== undefined) {
    return (
      <>
        {typeof children === "function"
          ? children(query.data as NonNullable<TData>)
          : children}
      </>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      {loadingElement}
    </div>
  );
}
