import { useEffect, useState } from 'react';
import { toWords } from 'number-to-words';

export const App = () => {
    const storageKeyName = "count";

   
    const retrieveCountValue = () => Number(localStorage.getItem(storageKeyName) || 0);

    const [count, setCount] = useState(retrieveCountValue());

    // Function to handle text-to-speech
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Set the language
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Text-to-Speech is not supported in this browser.');
        }
    };

    // Update local storage and trigger speech when count changes
    useEffect(() => {
        localStorage.setItem(storageKeyName, String(count));
        const countInWords = toWords(count); // Convert the count to words
        speak(`The count is now ${count}`);    }, [count]);

    // Increment count
    const addNumber = () => setCount(prevCount => prevCount + 1);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Welcome Stranger 🎉😊</h1>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ fontStyle: 'italic' }}>This is my beautiful React webapp with voice and numbers in words!</p>
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <span style={{
                    backgroundColor: 'black', color: 'white', fontFamily: 'NewYork', fontSize: '18px', fontWeight: 'bold', padding: '8px 12px'
                }}>
                    Count: {count} ({toWords(count)})
                </span>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button
                    style={{
                        fontSize: '16px', padding: '12px 24px', borderRadius: '8px', border: '2px solid', cursor: 'pointer'
                    }}
                    onClick={addNumber}
                >
                    Count Me!
                </button>
            </div>
        </div>
    );
};
