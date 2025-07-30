export function formatTime(timeInSeconds: number | undefined) {
    if (!timeInSeconds) {
        return "00:00";
    }

    let seconds: number = timeInSeconds % 60;
    let minutes: number = Math.floor(timeInSeconds / 60);

    let seconds_string = seconds.toString().padStart(2, "0");
    let minutes_string = minutes.toString().padStart(2, "0");

    return minutes_string + ":" + seconds_string;
}
