/* eslint-disable react/no-unknown-property */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/self-closing-comp */
import PropTypes from 'prop-types'
// hooks
import useResponsive from '../../hooks/useResponsive';

VirtualtourReport.propTypes = {
    embbed: PropTypes.string.isRequired
}
export default function VirtualtourReport ({embbed})  {
    const smUp = useResponsive('up', 'sm');
    return (
        <div>
            {embbed}
        </div>
    )
}


