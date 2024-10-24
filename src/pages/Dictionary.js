import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function Dictionary() {
  const [word, setWord] = useState('');  // Kullanıcının girdiği kelimeyi tutar
  const [definition, setDefinition] = useState(null);  // API'den gelen sonuçları tutar
  const [error, setError] = useState(null);  // Hata durumunu tutar

  const fetchDefinition = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const data = await response.json();
      setDefinition(data[0]);
      setError(null);  // Önceki hatayı sıfırla
    } catch (err) {
      setError(err.message);
      setDefinition(null);  // Önceki veriyi sıfırla
    }
  };

  return (
    <div className="App">
      <h1 className='text-center'>Dictionary App</h1>
      <div className="p-inputgroup flex-1">
    <InputText placeholder="Enter a word" value={word} onChange={(e) => setWord(e.target.value)} />
    <Button icon="pi pi-search" className="p-button-warning" onClick={fetchDefinition} />
</div>
      

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {definition && (
        <div>
          <h2>Word: {definition.word}</h2>
          <p>Phonetic: {definition.phonetic}</p>
          <h3>Meaning:</h3>
          <ul>
            {definition.meanings.map((meaning, index) => (
              <li key={index}>
                <strong>{meaning.partOfSpeech}</strong>: {meaning.definitions[0].definition}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dictionary;
