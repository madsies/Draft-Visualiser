import { Box } from "@mui/material"
import { Header } from "../shared/header"



export const Layout = ({ children }: { children?: React.ReactNode }) =>
{
    return (
        <Box sx={{width:"100vw", height:"100%", background:"url(ow_thumbnail.webp)"}}>

            <Header/>

            <Box sx={{width:"100%", maxWidth: "1200px"}}>
                {children}
            </Box>
        </Box>
    )
}