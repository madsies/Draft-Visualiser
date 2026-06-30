import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { useData } from "../shared/DataContext";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { RankIcon } from "./components/RankIcon";
import { PlayerRole } from "./components/PlayerRole";

interface Team
{
    captain: string;
    captainRank: string;
    budget: number;
    players: DraftPlayer[];
}

interface DraftPlayer
{
    name: string;
    cost: string;
    role: string;
}

export const Draft = () =>
{
    const {captains, players} = useData();
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        if (!captains.length) return;

        const initialTeams: Team[] = captains.map((captain) => ({
            captain: captain.name,
            captainRank: captain.rank,
            budget: captain.budget,
            players: []
        }));

        setTeams(initialTeams);
        }, [captains]);


    return (
        <Box sx={{}}>
            <Box sx={{display:"flex", width:"100%"}}>
                Draft
            </Box>
            {/* Left Side, Captains and Teams */}
            <Box sx={{display:"flex", width:"100%"}}>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-around", height:"90vh"}}>
                    {teams.map((team, i) => (
                        <Card key={i} sx={{ width: "350px", p: 2.5}}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center"  }}>
                            <Box>
                                <Typography fontWeight="bold" variant="h6">
                                {team.captain}
                                </Typography>

                                <span style={{ fontWeight: "bold", fontSize: 14 }}>
                                {team.captainRank}
                                </span>
                            </Box>

                            <Typography fontWeight="bolder" color={yellow[800]} textAlign={"center"} sx={{justifyContent:"center"}}>
                                £{team.budget.toLocaleString()}
                            </Typography>
                            </Box>
                        </Card>
                        ))}
                </Box>

                {/* Right Side, Player List*/}
                <Card sx={{p:2, ml:"auto"}}>
                    <Typography fontWeight={"bold"}>Players</Typography>
                    {players.map((player, i) =>
                    (
                        <>
                        <Box key={player.id} sx={{display:"flex", height:"35px", justifyContent:"space-between", alignItems:"center", p:1}}>
                            <Typography textAlign={"center"} sx={{mr:"auto"}}>{player.name}</Typography>
                            <Box sx={{display:"flex",  mt:"30px", gap:.75}}>
                                <RankIcon rank={player.rank} small={true} ></RankIcon>
                                <PlayerRole role={player.mainRole} small={true} secondary={player.secondaryRoles}/>
                            </Box>

                            <Button variant="contained" sx={{my:2}}>Draft</Button> 
                        </Box>
                        <Divider/>
                        </>

                    ))}

                </Card>
            </Box>
        </Box>

    )
}