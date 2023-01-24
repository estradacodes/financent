import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Loading(){

    return(
        <FontAwesomeIcon icon={faSpinner} size={"2x"} spin />
    )

}
export default Loading