import React from "react";

const Clock = () => {
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setDate(new Date());
    }

    return <h3>{date.toLocaleTimeString()}</h3>;
};

export default Clock;
