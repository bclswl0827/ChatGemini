import wandIcon from "../assets/icons/wand-sparkles-solid.svg";

interface LandingSample {
    readonly title: string;
    readonly description: string;
    readonly prompt: string;
}

interface LandingProps {
    readonly title: string;
    readonly samples: LandingSample[];
    readonly onSelectSample?: (prompt: string) => void;
}

export const Landing = (props: LandingProps) => {
    const { title, samples, onSelectSample } = props;
    return (
        <div className="py-6 pl-3 mx-auto max-w-[calc(100%)] items-center flex flex-col space-y-8">
            <div className="size-16 animate-ease-in-out animate-wiggle animate-infinite animate-duration-[3000ms]">
                <img src={wandIcon} alt="" />
            </div>

            <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900">
                {title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pr-2">
                {samples.map(({ title, description, prompt }, index) => (
                    <button
                        key={index}
                        className="p-3 rounded-lg hover:bg-gray-100 border"
                        onClick={() => onSelectSample && onSelectSample(prompt)}
                    >
                        <div className="font-semibold md:text-md text-sm text-gray-800/80">
                            {title}
                        </div>
                        <div className="text-gray-800/40 md:text-md text-xs">
                            {description}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
