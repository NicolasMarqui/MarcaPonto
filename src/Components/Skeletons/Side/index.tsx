import React from "react";
import ContentLoader from "react-content-loader";

interface SideBarSkeletonProps {}

const SideBarSkeleton: React.FC<SideBarSkeletonProps> = ({}) => {
    return (
        <ContentLoader
            speed={2}
            width={476}
            height={424}
            viewBox="0 0 476 424"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="33" cy="64" r="20" />
            <circle cx="33" cy="118" r="20" />
            <circle cx="33" cy="175" r="20" />
            <circle cx="33" cy="290" r="20" />
            <circle cx="33" cy="233" r="20" />
            <circle cx="33" cy="346" r="20" />
            <circle cx="33" cy="398" r="20" />
        </ContentLoader>
    );
};
export default SideBarSkeleton;
