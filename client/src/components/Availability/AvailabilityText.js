/**
 * Dummy component showing availability text
 */

export default function AvailabilityText({listAvailable, listUnavailable}) {

    return (
        <div id='available'>
            <div>
                <div>Available</div>
                {listAvailable.map((name) => (
                    <div>{name}</div>
                ))}
            </div>
            <div>
                <div>Unavailable</div>
                {listUnavailable.map((name) => (
                    <div>{name}</div>
                ))}
            </div>
            
        </div>
    )
}