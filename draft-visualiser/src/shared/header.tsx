import { AppBar, Avatar, Toolbar, Typography } from "@mui/material"


export const Header = () =>
{
    return (
        <>
            <AppBar position="fixed" color="primary" sx={{ width: "100%", zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar sx={{ display: "relative", gap:1}}>
                    <Avatar src="logo/ow.png" ></Avatar>
                    <Typography variant="h5" fontWeight={"bold"}>Overwatch Draft</Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}