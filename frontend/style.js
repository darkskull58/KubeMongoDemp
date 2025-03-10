// script.js
document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsList = document.getElementById('itemsList');
    
    // API URL - will be replaced by the actual domain in production
    const API_URL = '/api';
    
    // Fetch all items
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/items`);
        const items = await response.json();
        
        itemsList.innerHTML = '';
        items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item.name;
          itemsList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    
    // Add new item
    addItemBtn.addEventListener('click', async () => {
      const name = itemInput.value.trim();
      if (!name) return;
      
      try {
        await fetch(`${API_URL}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
        
        itemInput.value = '';
        fetchItems();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    });
    
    // Initial load
    fetchItems();
  });