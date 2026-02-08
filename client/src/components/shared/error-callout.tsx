import { Callout, Link } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ErrorCalloutProps extends Callout.RootProps {
  onRetry?: () => void;
}

export function ErrorCallout({ children, onRetry, ...rest }: ErrorCalloutProps) {
  return (
    <Callout.Root color="red" role="alert" {...rest}>
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>
        {children}
        {' '}
        {onRetry && (
          <Link asChild underline="always" color="red">
            <button type="button" onClick={onRetry}>
              Retry
            </button>
          </Link>
        )}
      </Callout.Text>
    </Callout.Root>
  );
}
