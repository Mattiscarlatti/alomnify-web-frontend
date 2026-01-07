interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`${className} max-w-screen-2xl mx-auto px-2 sm:px-4 xl:px-0 py-2 sm:py-4`}>
      {children}
    </div>
  );
};

export default Container;