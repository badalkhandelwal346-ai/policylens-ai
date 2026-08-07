"use client";

type UserInfoCardProps = {
  name?: string;
  title?: string;
};

export function UserInfoCard({
  name = "Director Sarah Jenkins",
  title = "Global Policy Compliance Division",
}: UserInfoCardProps) {
  return (
    <div className="flex flex-col items-center text-center mt-2 mb-4">
      <h1 className="text-2xl font-bold tracking-tight text-brand-navy">
        {name}
      </h1>
      <p className="text-sm font-medium text-slate-500 mt-0.5">
        {title}
      </p>
    </div>
  );
}
