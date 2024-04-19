const NiceHeader = ({ icon, text }: { icon?: string; text: string }) => {
  return (
    <h2 className="mb-2 flex items-center text-left">
      {icon ? (
        <svg className="mr-5 h-12 w-12" viewBox="0 0 24 24">
          <path fill="currentColor" d={icon} />
        </svg>
      ) : (
        <></>
      )}

      <span className="align-middle text-xl font-medium">{text}</span>
    </h2>
  );
};

export default NiceHeader;
