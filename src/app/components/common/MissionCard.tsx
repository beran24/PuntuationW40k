'use client';

type MissionCardProps = {
  type: string;
  title?: string;
  subtitle?: string;
  section?: string;
};

export default function MissionCard({
  type,
  title,
  subtitle,
  section,
}: MissionCardProps) {
  return (
    <div className="max-w-md bg-[#f5efe0] border border-black rounded-md overflow-hidden shadow-md">
      <div className="bg-[#140801] text-[#b6a46e] text-center pt-4  text-sm font-bold tracking-wide">
        {type.toUpperCase()}
      </div>
      <div className="bg-[#140801] text-center font-extrabold text-lg pb-4 uppercase">
        {title}
      </div>
      <div className="text-center italic text-sm   p-4 text-black border-b-2 border-dotted border-b-black">
        {subtitle}
      </div>
      <div className="text-black font-bold p-4  text-sm">{section}</div>
    </div>
  );
}
