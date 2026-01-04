import { useState, useEffect } from 'react';

interface CountdownTimerProps {
    className?: string;
    targetDate?: string; // Optional: allow overriding the target date
}

const CountdownTimer = ({ className = "leading-[normal]", targetDate = "2026-02-14T00:00:00" }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
                    minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
                    seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0')
                };
            }
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Initial call
        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <p className={`${className} whitespace-nowrap`}>
            {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
        </p>
    );
};

export default CountdownTimer;
