import { FunctionComponent } from 'react';

export const Top: FunctionComponent = () => {
    return (
        <>
            <form method='GET' action='/api/generateAuthUrl'>
                <button type='submit'>Redirect</button>
            </form>
        </>
    );
};
