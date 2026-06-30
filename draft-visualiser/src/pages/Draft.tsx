import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { useData } from "../shared/DataContext";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { RankIcon } from "./components/RankIcon";
import { PlayerRole } from "./components/PlayerRole";
import { PlayerCard } from "./components/PlayerCard";

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
    rank: string;
    pictureUrl: string;
    team: string;
    heroes: string[];
    cost: number;
    mainRole: string;
    secondaryRole: string;
    funFact: string;
}


export const Draft = () =>
{
    const {captains, players} = useData();
    const [teams, setTeams] = useState<Team[]>([]);
    const [draftPlayers, setDraftPlayers] = useState<DraftPlayer[]>([]);
    const [activeAuction, setActiveAuction] = useState<boolean>(false);
    const [auctionPlayer, setAuctionPlayer] = useState<DraftPlayer>();

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

    useEffect(() =>
    {
        if (!players.length) return;
        const initialPlayers: DraftPlayer[] = players.map((player) =>
        ({
            name: player.name,
            rank: player.rank,
            cost: 0,
            pictureUrl: player.pictureUrl,
            team: player.team,
            heroes: player.heroes,
            mainRole: player.mainRole,
            secondaryRole: player.secondaryRoles,
            funFact: player.funFact
        }));

        setDraftPlayers(initialPlayers);
    }, [players])

    const draftPlayer = (player: DraftPlayer) =>
    {
        // Display Player Card in Center of screen, put it in auction state, with money input and buttons to choose whichever player wins
        setActiveAuction(true);
        setAuctionPlayer(player);
        setDraftPlayers(prev =>
            prev.filter(p => p.name !== player.name)
            );
    }

    return (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Box sx={{display:"flex", width:"100%"}}>
                Draft
            </Box>
            {/* Left Side, Captains and Teams */}
            <Box sx={{display:"flex", width:"100%", mr:"auto"}}>
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
                
                {/* Center, Draft */}
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
                >
                {auctionPlayer && (
                    <Box
                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, }}
                    >
                    <PlayerCard
                        name={auctionPlayer?.name}
                        pictureUrl={auctionPlayer.pictureUrl}
                        team={auctionPlayer.team}
                        role={auctionPlayer?.mainRole}
                        secondary={auctionPlayer?.secondaryRole}
                        heroes={auctionPlayer.heroes}
                        rank={auctionPlayer?.rank}
                        fact={auctionPlayer.funFact}
                        large
                    />

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                        {teams.map((team, i) => (
                        <Button
                            key={i}
                            disabled={team.players.length >= 6}
                            variant="contained"
                            color="secondary"
                        >
                            {team.captain}
                        </Button>
                        ))}
                    </Box>
                    </Box>
                )}
                </Box>

                {/* Right Side, Player List*/}
                <Card sx={{p:2,   width:"500px"}}>
                    <Typography fontWeight={"bold"}>Players</Typography>
                    {draftPlayers.map((player, i) =>
                    (
                        <>
                        <Box key={player.name} sx={{display:"flex", height:"35px", justifyContent:"space-between", alignItems:"center", p:1}}>
                            <Typography textAlign={"center"} sx={{mr:"auto"}}>{player.name}</Typography>
                            <Box sx={{display:"flex",  mt:"30px", gap:.75}}>
                                <RankIcon rank={player.rank} small={true} ></RankIcon>
                                <PlayerRole role={player.mainRole} small={true} secondary={player.secondaryRole}/>
                            </Box>

                            <Button variant="contained" onClick={() => draftPlayer(player)}sx={{my:2}}>Draft</Button> 
                        </Box>
                        <Divider/>
                        </>

                    ))}

                </Card>
            </Box>
        </Box>

    )
}