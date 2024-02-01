import toast from "react-hot-toast";

export const sendUserConfirm = (
    message: string,
    onConfirmed: () => void,
    onCancelled?: () => void,
    timeout: number = 30000
) => {
    toast.custom(
        ({ visible, id }) => (
            <div
                className={`animate-fade animate-duration-300 max-w-md w-full bg-white shadow-lg rounded-lg flex border ${
                    visible ? "block" : "hidden"
                }`}
            >
                <div className="flex-1 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                确认操作
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-gray-200 gap-2 items-center justify-center m-2">
                    <button
                        onClick={() => {
                            toast.dismiss(id);
                            onConfirmed();
                        }}
                        className="w-full border rounded-lg px-4 py-2 flex text-sm font-medium text-white bg-red-500 hover:bg-red-700 "
                    >
                        确定
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(id);
                            onCancelled && onCancelled();
                        }}
                        className="w-full border rounded-lg px-4 py-2 flex text-sm font-medium hover:bg-gray-300"
                    >
                        取消
                    </button>
                </div>
            </div>
        ),
        { duration: timeout }
    );
};
