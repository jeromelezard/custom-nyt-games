"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectionsWord } from "@/lib/generated/prisma";
import { motion, Reorder, useDragControls } from "framer-motion";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ConnectionsWordTile, { ConnectionsWordTileProps } from "./ConnectionsWordTile";
import { useState } from "react";

interface CreateConnectionsWordProps extends ConnectionsWordTileProps {
    word: ConnectionsWord;
    reOrderWords: () => Promise<void>;
}

export default function CreateConnectionsWord({ word, reOrderWords, children, ...props }: CreateConnectionsWordProps) {
    const controls = useDragControls();
    const [isDragging, setIsDragging] = useState(false);
    return (
        <motion.div layout={false}>
            <Reorder.Item
                id={word.connectionsWordId}
                value={word}
                dragListener={false}
                dragControls={controls}
                transition={isDragging ? {} : { layout: { duration: 0 } }} // TODO: fix animation bug while allowing full drag animation.
                onDragStart={() => setIsDragging(true)}
                whileDrag={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                style={{
                    zIndex: isDragging ? 999 : "auto",
                    position: "relative",
                }}
                onDragEnd={() => {
                    reOrderWords();
                    setIsDragging(false);
                }}
                animate={isDragging ? {} : { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
            >
                <div className="relative">
                    <ConnectionsWordTile {...props}>{children}</ConnectionsWordTile>
                    <FontAwesomeIcon
                        icon={faBars}
                        onPointerDown={(event) => controls.start(event)}
                        style={{ touchAction: "none" }}
                        className={`absolute top-1 right-1  cursor-grab ${props.difficultyShade && "text-slate-800"} `}
                    />
                </div>
            </Reorder.Item>
        </motion.div>
    );
}
