import { TrackedExternalLink } from "../links";

export const ArticleReference = (
    imgSrc: string,
    href?: string,
    className?: string
  ) => {
    return (
      <TrackedExternalLink key={href} href={href} className={className}>
        <img
          className="rounded"
          height={100}
          width={160}
          src={imgSrc}
          alt=""
        ></img>
      </TrackedExternalLink>
    );
  };
  