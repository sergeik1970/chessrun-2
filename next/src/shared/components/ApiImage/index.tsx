import React, { useState } from "react";

interface ApiImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    sizes?: string;
    className?: string;
    onClick?: () => void;
}

const ApiImage: React.FC<ApiImageProps> = ({ src, alt, width, height, sizes, className, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = (e: any) => {
        setIsLoading(false);
        setHasError(true);
    };

    if (hasError) {
        return (
            <div
                className={className}
                style={{
                    width: width || "auto",
                    height: height || "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f0f0",
                    color: "#666",
                    fontSize: "14px",
                }}
            >
                Ошибка загрузки изображения
            </div>
        );
    }

    return (
        <>
            {isLoading && (
                <div
                    className={className}
                    style={{
                        width: width || "auto",
                        height: height || "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        color: "#666",
                        fontSize: "14px",
                    }}
                >
                    Загрузка...
                </div>
            )}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
                onClick={onClick}
                onLoad={handleLoad}
                onError={handleError}
                style={{ display: isLoading ? "none" : "block" }}
                {...(sizes && { 'data-sizes': sizes })}
            />
        </>
    );
};

export default ApiImage;
