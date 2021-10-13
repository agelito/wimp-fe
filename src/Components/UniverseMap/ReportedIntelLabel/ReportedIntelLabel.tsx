import React from "react";
import "./ReportedIntelLabel.css"

interface Props {
    reportedIntelCount: number
}

export const ReportedIntelLabel: React.FC<Props> = ({ reportedIntelCount }) => {

    return (
        <div className={"flex-container"}>
            {
                reportedIntelCount > 0 && <div className={"intel-label text-monospace"}>
                    {reportedIntelCount}
                </div>
            }
        </div>
    );
}