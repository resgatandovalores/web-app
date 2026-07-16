import { useState } from "react";

interface CoverflowGalleryProps {
    images: string[];
}

export default function CoverflowGallery({
    images,
}: CoverflowGalleryProps) {

    const [active, setActive] = useState(0);

    const previous = () => {
        setActive((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const next = () => {
        setActive((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const getPosition = (index: number) => {

        let offset = index - active;

        if (offset > images.length / 2)
            offset -= images.length;

        if (offset < -images.length / 2)
            offset += images.length;

        return offset;
    };

    return (

        <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden">

            {/* seta esquerda */}

            <button
                onClick={previous}
                className="absolute left-5 z-50 h-12 w-12 rounded-full bg-white/90 shadow-xl hover:scale-110 duration-300"
            >
                ←
            </button>

            {/* imagens */}

            <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: "2200px" }}
            >

                {images.map((image, index) => {

                    const offset = getPosition(index);

                    if (Math.abs(offset) > 3)
                        return null;

                    const isCenter = offset === 0;

                    return (

                        <img
                            key={index}
                            src={image}
                            onMouseEnter={() => setActive(index)}
                            draggable={false}
                            className="absolute rounded-2xl object-cover shadow-2xl cursor-pointer select-none duration-700 ease-in-out"
                            style={{

                                width: isCenter ? 420 : 290,

                                height: isCenter ? 540 : 420,

                                left: "50%",

                                top: "50%",

                                opacity:
                                    Math.abs(offset) >= 3
                                        ? 0
                                        : 1 - Math.abs(offset) * 0.25,

                                filter: isCenter
                                    ? "brightness(1)"
                                    : "brightness(.55)",

                                zIndex: 100 - Math.abs(offset),

                                transform: `
translate(
calc(-50% + ${offset * 180}px),
-50%)
rotateY(${-offset * 40}deg)
translateZ(${isCenter ? 180 : -Math.abs(offset) * 70}px)
scale(${isCenter ? 1 : 0.82})
`,

                                transition:
                                    "all .65s cubic-bezier(.22,.61,.36,1)"
                            }}
                        />

                    );

                })}

            </div>

            {/* seta direita */}

            <button
                onClick={next}
                className="absolute right-5 z-50 h-12 w-12 rounded-full bg-white/90 shadow-xl hover:scale-110 duration-300"
            >
                →
            </button>

        </div>

    );

}