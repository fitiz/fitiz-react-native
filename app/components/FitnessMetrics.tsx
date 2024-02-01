import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface FitnessMetricsProps {
    steps: number,
    goal: number,
    calories: number,
    distance: number
}

export const FitnessMetrics: React.FC<FitnessMetricsProps> = ({ steps, goal, calories, distance }) => {
    const [progress, setProgress] = useState( (goal/steps) * 100);
    const formattedGoal: string = new Intl.NumberFormat('en-IN', { style: 'decimal', useGrouping: true }).format(goal).replace(/,/g, ' ');

    useEffect(() => {
        setProgress((steps/goal) * 100);
    }, [steps, goal])

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Steps</Text>
            <Text style={styles.stepsCountText}>{steps}</Text>
            <Text style={styles.infoText}>of {formattedGoal} (daily goal)</Text>

            <AnimatedCircularProgress
                size={200}
                width={15}
                fill={progress}
                tintColor="#90EE90"
                rotation={0}
                backgroundColor="#808080">
                {
                    () => (
                        <Text>
                            {progress.toFixed(2)}% completed
                        </Text>
                    )
                }
            </AnimatedCircularProgress>

            <View style={styles.metricsContainer}>
                <View style={styles.metrics}>
                    <Text style={styles.metricsText}>Calories</Text>
                    <Text style={styles.metricsCountText}>{calories}</Text>
                </View>
                <View style={styles.metrics}>
                    <Text style={styles.metricsText}>Distance</Text>
                    <Text style={styles.metricsCountText}>{distance.toFixed(2)} km</Text>
                </View>
            </View>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff'
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20
    },
    stepsCountText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20
    },
    metricsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20
    },
    metrics: {
        alignItems: 'center',
        marginVertical: 40,
        marginHorizontal: 40
    },
    metricsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10
    },
    metricsCountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    }
});
