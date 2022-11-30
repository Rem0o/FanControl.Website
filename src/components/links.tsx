import { twMerge } from "tailwind-merge";

const gaOnClick =
  (
    props: React.AllHTMLAttributes<HTMLAnchorElement>
  ): React.MouseEventHandler<HTMLAnchorElement> =>
  (e) => {
    if (typeof props.onClick === `function`) {
      props.onClick(e);
    }
    let redirect = true;
    if (
      e.button !== 0 ||
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.defaultPrevented
    ) {
      redirect = false;
    }
    if (props.target && props.target.toLowerCase() !== `_self`) {
      redirect = false;
    }
    if (window.gtag) {
      window.gtag(`event`, `click`, {
        event_category: `outbound`,
        event_label: props.href,
        transport_type: redirect ? `beacon` : ``,
        event_callback: function () {
          if (redirect && document && props.href) {
            document.location = props.href;
          }
        },
      });
    } else {
      if (redirect && document && props.href) {
        document.location = props.href;
      }
    }

    return false;
  };

const TrackedAnchor = (props: React.AllHTMLAttributes<HTMLAnchorElement>) => {
  const { onClick, ...restOfProps } = props;
  return <a {...restOfProps} onClick={gaOnClick(props)}></a>;
};

const ExternalLink = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  const { children, className, href, ...restOfProps } = props;
  return (
    <a
      className={twMerge("hover:text-primary-500 underline", className)}
      href={href}
      {...restOfProps}
    >
      {children}
    </a>
  );
};

const TrackedExternalLink = (
  props: React.AllHTMLAttributes<HTMLAnchorElement>
) => {
  const { onClick, children, ...restOfProps } = props;

  return (
    <ExternalLink onClick={gaOnClick(props)} {...restOfProps}>
      {children}
    </ExternalLink>
  );
};

export { TrackedAnchor, ExternalLink, TrackedExternalLink };
