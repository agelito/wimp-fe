import React from "react";
import "./ReportedIntelLabel.css"

interface Props {
    reportedIntelCount: number
}

export const ReportedIntelLabel: React.FC<Props> = ({ reportedIntelCount }) => {

    return (
        <div className={"flex-container"}>
            <div className={"intel-label text-monospace"}>
                {reportedIntelCount}
            </div>
        </div>
    );
}