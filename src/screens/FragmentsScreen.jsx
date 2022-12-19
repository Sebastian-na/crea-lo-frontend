import React, { useEffect, useMemo } from 'react';
import '../css/FragmentsScreen.css'
import Tree from '../components/Tree';
import { styled } from '@mui/system';
import { Globals } from "@react-spring/shared";
import ScrollContainer from 'react-indiana-drag-scroll'
import { useTheme } from '@mui/material/styles';
import { useDeviceDetect } from "../hooks/";
import { useQuery } from '@apollo/client';
import { GET_CONCEPTS } from '../graphql/queries/concept';

// necessary for react-spring and react-three-drei to work
Globals.assign({
    frameLoop: "always",
});

const Container = styled('div')(({ theme }) => ({
    padding: "4rem",
    color: theme.palette.fragments.contrastText,
    lineHeight: "21px",
    "--webkit-user-elect": "none",
    userSelect: "none",
}));

const FragmentsScreen = () => {
    const { isMobile } = useDeviceDetect();
    const { loading, error, data } = useQuery(GET_CONCEPTS);
    const theme = useTheme();

    //create a hashmap of concept id to concept object
    const conceptMap = useMemo(() => {
        const conceptMap = {}
        if (!data) return conceptMap
        data.concepts.data.forEach(concept => {
            conceptMap[concept.id] = concept
        })
        return conceptMap
    }, [data])

    //appropriate container for mobile or desktop
    const AppropiateContainer = useMemo(() => ({ children }) => {
        return isMobile ? <Container>{children}</Container> : <ScrollContainer className='scroll-container' style={{
            padding: "4rem",
            width: "calc(100vw - 6rem)",
            height: "calc(100vh - 2rem)",
            color: theme.palette.text.primary,
            lineHeight: "21px",
            "--webkit-user-select": "none",
            overflow: "hidden",
            userSelect: "none",
        }}>{children}</ScrollContainer>
    }, [isMobile])

    return (
        <>
            <div id="fragments-background" />
            <AppropiateContainer>
                {!loading && <Tree treeData={conceptMap} currentNode={data.concepts.data[0]} />}
            </AppropiateContainer>
        </>

    )
}

export default FragmentsScreen