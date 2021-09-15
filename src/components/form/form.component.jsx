import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
 
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width : "100%",
        margin: theme.spacing(1)
    }
}))

const Form = ({children , ...props}) => {
    const styles = useStyles()
    return (
        <form className={styles.root} noValidate {...props}>
            {children}
        </form>
    )
}

export default Form
