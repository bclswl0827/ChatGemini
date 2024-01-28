import { useEffect, useState } from "react";

export const Skeleton = () => {
    const [skeletonRows, setSkeletonRows] = useState(2);

    useEffect(() => {
        const rows = Math.floor(0.4 * (window.innerHeight / 100));
        setSkeletonRows(rows > 0 ? rows : 2);
    }, []);

    return (
        <div className="p-8 mx-auto space-y-3 w-[calc(75%)] animate-pulse">
            {[...new Array(skeletonRows)].map((_, index) => (
                <div key={index} className="space-y-3">
                    <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full" />
                    <div className="h-2 bg-gray-200 rounded-full" />
                    <div className="h-2 bg-gray-200 rounded-full" />
                    <div className="h-2 bg-gray-200 rounded-full" />
                    <div className="h-2 bg-gray-200 rounded-full" />
                </div>
            ))}
        </div>
    );
};
