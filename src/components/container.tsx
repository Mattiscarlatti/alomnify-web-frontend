interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`${className} max-w-screen-2xl mx-auto px-4 xl:px-0 py-4`}>
      {children}
    </div>
  );
};

export default Container;