import { AppBar, Toolbar, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"


export const Header = () =>
{
    return (
        <>
            <AppBar position="fixed"  sx={{ width: "100%", zIndex: (theme) => theme.zIndex.drawer + 1, background:grey["A700"]}}>
                <Toolbar sx={{ display: "relative"}}>
                    <Typography>Overwatch Draft</Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}