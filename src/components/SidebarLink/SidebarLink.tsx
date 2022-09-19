import { FC, SVGProps } from "react";

type Props = {
  text: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  active?: boolean;
};

export const SidebarLink: FC<Props> = (props) => {
  const { text, Icon, active } = props;
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        active && "font-bold"
      }`}
    >
      <Icon className="h-7 text-white" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};
