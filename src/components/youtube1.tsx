export default function Youtube1() {
  return (
    <div className="flex justify-center mb-10">
      <iframe
        className="w-full h-64 sm:w-[1120px] sm:min-h-[630px]"
        width="1120"
        height="630"
        src="https://www.youtube.com/embed/TmWmQ8qK2Ic"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
