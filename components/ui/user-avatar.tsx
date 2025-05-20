import {cn} from "@/lib/utils";

interface Props {
	name: string;
	size?: keyof typeof SIZES;
	className?: string;
}

const SIZES = {
	small: "w-8 h-8",
	medium: "w-10 h-10",
	large: "w-14 h-14",
};

export default function UserAvatar({name, size = "small", className}: Props) {
	return (
		<div className={cn("flex items-center justify-center rounded-full bg-primary/10 text-primary", SIZES[size], className)}>{name.charAt(0)}</div>
	);
}
