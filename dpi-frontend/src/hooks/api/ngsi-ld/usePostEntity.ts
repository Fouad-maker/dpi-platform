
import { getContextBrokerConnectionDetails } from 'src/config/contextBroker';
import { useApiCallback } from '../useApiCallback';

export const usePostEntity = <EntityType,>(linkHeader: string): {
    makeRequest: (data: EntityType) => Promise<any>;
    responseStatus: number;
    error: any;
    loading: boolean;
} => {
    const hook = useApiCallback();
    const connectionDetails = getContextBrokerConnectionDetails()
    return {
        responseStatus: hook.responseStatus,
        error: hook.error,
        loading: hook.loading,
        makeRequest: (data: EntityType) => hook.makeRequest({
            url: connectionDetails.url + `${Array.isArray(data) ? '/entityOperations/upsert' : '/entities/' }`,
            headers: {
                'Content-Type': 'application/json', // Added Content-Type header
                Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`
            },
            method: "POST",
            data: data
        })
    };
};