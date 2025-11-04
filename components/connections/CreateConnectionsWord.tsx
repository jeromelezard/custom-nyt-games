"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectionsWord } from "@/lib/generated/prisma";
import { Reorder, useDragControls } from "framer-motion";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ConnectionsWordTile, { ConnectionsWordTileProps } from "./ConnectionsWordTile";
import { useState } from "react";

interface CreateConnectionsWordProps extends ConnectionsWordTileProps {
    word: ConnectionsWord;
    reOrderWords: () => Promise<void>;
}

export default function CreateConnectionsWord({
    word,
    reOrderWords,
    disabled = false,
    variant,
    onClick,
    loading,
    children,
}: CreateConnectionsWordProps) {
    const controls = useDragControls();
    const [isDragging, setIsDragging] = useState(false);
    return (
        <Reorder.Item
            id={word.connectionsWordId}
            value={word}
            dragListener={false}
            dragControls={controls}
            onDragStart={() => setIsDragging(true)}
            whileDrag={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            onDragEnd={() => {
                reOrderWords();
                setIsDragging(false);
            }}
            animate={isDragging ? {} : { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
        >
            <div className="relative">
                <ConnectionsWordTile variant={variant} disabled={disabled} onClick={onClick} loading={loading}>
                    {children}
                </ConnectionsWordTile>
                <FontAwesomeIcon
                    icon={faBars}
                    onPointerDown={(event) => controls.start(event)}
                    style={{ touchAction: "none" }}
                    className="absolute top-1 right-1 opacity-50 cursor-grab "
                />
            </div>
        </Reorder.Item>
    );
}
