import { Autocomplete, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material"
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';
import { useState } from "react";

type Captain = {
  id: string;
  name: string;
  budget: number;
  rank: string;
  team: string;
};

type Player = {
  id: string;
  pictureUrl: string;
  name: string;
  team: string;
  heroes: string[];
  mainRole: string;
  otherRoles: string[];
  funFact: string;
  rank: string;
};

const Heroes = [
    "D.Va", "Domina", "Doomfist","Hazard","Junker Queen","Mauga","Orisa","Ramattra","Reinhardt","Roadhog","Sigma","Winston","Wrecking Ball","Zarya",
    "Ashe", "Anran", "Bastion", "Cassidy", "Echo", "Emre", "Freja", "Genji", "Hanzo", "Junkrat", "Mei", "Pharah", "Reaper", "Sierra", "Sojourn", "Soldier: 76", "Sombra", "Symmetra", "Torbjörn", "Tracer", "Vendetta", "Venture",  "Widowmaker", "Shion",
    "Ana", "Baptiste", "Brigitte", "Illari", "Kiriko", "Lifeweaver", "Lúcio", "Jetpack Cat", "Juno", "Mercy", "Mizuki", "Moira", "Zenyatta"
]

const Roles = [
    "Damage", "Tank", "Support", "Flex"
]

export const Create = () =>
{
    const [captains, setCaptains] = useState<Captain[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);

    const captainRows: GridRowsProp = captains;
    const captainColumns: GridColDef[] = [
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        editable: true,
    },
    {
        field: "budget",
        headerName: "Budget",
        type: "number",
        flex: 1,
        editable: true,
    },
    {
        field: "rank",
        headerName: "Rank",
        type: "singleSelect",
        flex: 1,
        editable: true,
        valueOptions: ["Bronze", "Silver", "Gold", "Platinum", "Diamond 5", "Diamond 4", "Diamond 3", "Diamond 2", "Diamond 1", 
            "Master 5", "Master 4", "Master 3", "Master 2", "Master 1", "GrandMaster 5", "GrandMaster 4", "GrandMaster 3", "GrandMaster 2", "GrandMaster 1",
            "Champion 5", "Champion 4", "Champion 3", "Champion 2", "Champion 1"]
    },
    {
        field: "team",
        headerName: "Team",
        flex: 1,
        editable: true,
        type: "singleSelect",
        valueOptions: ["DoughNotts", "CocoNotts", "HazelNotts", "PeaNotts", "No Team"]
    },
    ];

    const playerRows: GridRowsProp = players;
    const playerColumns: GridColDef[] = 
    [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            editable: true,
        },
        {
            field: "pictureUrl",
            headerName: "pic",
            type: "string",
            flex: 1,
            editable:true
        },
        {
            field: "team",
            headerName: "Team",
            flex: 1,
            editable: true,
            type: "singleSelect",
            valueOptions: ["DoughNotts", "CocoNotts", "HazelNotts", "PeaNotts", "No Team"]
        },
        {
            field: "heroes",
            headerName:"Heroes",
            flex:1,
            editable: true,
            renderEditCell: (params) => {
                return (
                    <Autocomplete
                    multiple
                    options={Heroes}
                    value={Array.isArray(params.value) ? params.value : []}
                    onChange={(_, newValue) => {
                        params.api.setEditCellValue({
                        id: params.id,
                        field: params.field,
                        value: newValue,
                        });
                    }}
                    renderInput={(paramsInput) => (
                        <TextField {...paramsInput} variant="standard" />
                    )}
                    sx={{ width: "100%" }}
                    />
                );
            }
        },
        {
            field:"mainRole",
            headerName:"Main Role",
            flex:1,
            editable:true,
            type:"singleSelect",
            valueOptions:Roles
        },
        {
            field:"funFact",
            headerName:"Fun Fact",
            flex:1, 
            editable:true,
            type:"string",
        }

    ]

    const handleProcessRowUpdate = (newRow: Captain) => {
    setCaptains((prev) =>
        prev.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
    };


    return (
        <Box sx={{display:"flex", flexDirection:"row", maxWidth:"100%", justifyContent:"space-around", gap:2, height:"100%", m:5}}>
            {/* Adding Captains */}
            <Card sx={{width:"35%", p:2, background:"#90e57199"}}>
                <Typography variant="h6">Captains ({captains.length})</Typography>
                <Button
                    onClick={() =>
                        setCaptains((prev) => [
                        ...prev,
                        {
                            id: crypto.randomUUID(),
                            name: "Captain Name",
                            budget: 1000000,
                            rank: "Bronze",
                            team: "DoughNotts",
                        },])}>
                    Add Captain
                </Button>
                <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={captains}
                    columns={captainColumns}
                    processRowUpdate={handleProcessRowUpdate}/>
                </div>
        </Card>

            {/* Adding Players */}
            <Card sx={{width:"55%", background:"#fe93bc99", p:2 }}>
                <Typography variant="h6">Players ({players.length})</Typography>
                 <Button
                    onClick={() =>
                        setPlayers((prev) => [
                        ...prev,
                        {
                            id: crypto.randomUUID(),
                            pictureUrl: "url here",
                            name: "Player Name",
                            team: "PeaNotts",
                            heroes: [],
                            mainRole: "Flex",
                            otherRoles: [],
                            funFact: "Fun Fact",
                            rank: "Bronze",
                        },])}>
                    Add Player
                </Button>
                <DataGrid rows={players} columns={playerColumns}></DataGrid>
            </Card>
        </Box>
    )
}