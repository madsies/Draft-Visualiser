import { Box, Button } from "@mui/material";
import { useData } from "../shared/DataContext";
import { PlayerCard } from "./components/PlayerCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

export const List = () =>
{
    const {players} = useData();

    return (
        <>
            <Box sx={{display:"flex", m:2, mt:5, gap:2}}>
                <Button component={Link} to={"/"} variant="contained" color="secondary">Back</Button>
            </Box>
            <Grid2 container sx={{display:"flex", my:4}}>
                {players.map((player) => (
                    <PlayerCard
                        key={player.id}
                        name={player.name}
                        pictureUrl={player.pictureUrl}//"https://cdn.discordapp.com/attachments/639183855529623624/1521552447649087559/yuu_cropped.png?ex=6a453fa4&is=6a43ee24&hm=6fca7d2133774d524a5feff11460523190a385d78254ac8abb4ecbce39c77ddb&"
                        team={player.team}
                        role={player.mainRole}
                        secondary={player.secondaryRoles}
                        heroes={player.heroes}
                        rank={player.rank}
                        fact={player.funFact}
                    />
                ))}
                
            </Grid2>
        </>
    )
}