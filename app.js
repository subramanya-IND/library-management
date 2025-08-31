// School Library & Device Tracking System JavaScript

class LibraryTracker {
    constructor() {
        this.currentMode = 'books'; // 'books' or 'devices'
        this.currentSchool = '';
        this.selectedItem = null;
        this.selectedTransaction = null;

        // Initialize data
this.schools = [
    {"id": "01", "name": "JNV Kurnool", "location": "Kurnool", "model": "CoE"},
    {"id": "02", "name": "JNV Kokrajhar", "location": "Kokrajhar", "model": "CoE"},
    {"id": "03", "name": "JNV Chandigarh", "location": "Chandigarh", "model": "CoE"},
    {"id": "04", "name": "JNV Mahisagar", "location": "Mahisagar", "model": "CoE"},
    {"id": "05", "name": "JNV Hassan", "location": "Hassan", "model": "CoE"},
    {"id": "06", "name": "JNV Kottayam", "location": "Kottayam", "model": "CoE"},
    {"id": "07", "name": "JNV Trivandrum", "location": "Trivandrum", "model": "CoE"},
    {"id": "08", "name": "EMRS Bhopal", "location": "Bhopal", "model": "CoE"},
    {"id": "09", "name": "JNV Barwani", "location": "Barwani", "model": "CoE"},
    {"id": "10", "name": "JNV Kolhapur", "location": "Kolhapur", "model": "CoE"},
    {"id": "11", "name": "JNV Palghar", "location": "Palghar", "model": "CoE"},
    {"id": "12", "name": "JNV Kohima", "location": "Kohima", "model": "CoE"},
    {"id": "13", "name": "JNV Cuttack", "location": "Cuttack", "model": "CoE"},
    {"id": "14", "name": "JNV Puducherry", "location": "Puducherry", "model": "CoE"},
    {"id": "15", "name": "JNV Bundi", "location": "Bundi", "model": "CoE"},
    {"id": "16", "name": "JNV Adilabad", "location": "Adilabad", "model": "CoE"},
    {"id": "17", "name": "JNV Medak", "location": "Medak", "model": "CoE"},
    {"id": "18", "name": "JNV Lucknow", "location": "Lucknow", "model": "CoE"},
    {"id": "19", "name": "JNV Durgapur", "location": "Durgapur", "model": "CoE"},
    {"id": "20", "name": "JNV Bharuch", "location": "Bharuch", "model": "Nodal"},
    {"id": "21", "name": "JNV Chamarajanagar", "location": "Chamarajanagar", "model": "Nodal"},
    {"id": "22", "name": "JNV Hassan", "location": "Hassan", "model": "Nodal"},
    {"id": "23", "name": "JNV Mandya", "location": "Mandya", "model": "Nodal"},
    {"id": "24", "name": "JNV South Canara", "location": "South Canara", "model": "Nodal"},
    {"id": "25", "name": "JNV Udupi", "location": "Udupi", "model": "Nodal"},
    {"id": "26", "name": "JNV Chandrapur", "location": "Chandrapur", "model": "Nodal"},
    {"id": "27", "name": "JNV Nagpur", "location": "Nagpur", "model": "Nodal"},
    {"id": "28", "name": "JNV Wardha", "location": "Wardha", "model": "Nodal"},
    {"id": "29", "name": "JNV Adilabad", "location": "Adilabad", "model": "Nodal"},
    {"id": "30", "name": "JNV Karimnagar", "location": "Karimnagar", "model": "Nodal"},
    {"id": "31", "name": "JNV Vaishali", "location": "Vaishali", "model": "Nodal"},
    {"id": "32", "name": "JNV Bhagalpur", "location": "Bhagalpur", "model": "Nodal"}
        ];

        this.bookCategories = [
            {"code": "000", "name": "Physics"},
            {"code": "100", "name": "Chemistry"},
            {"code": "200", "name": "Maths"},
            {"code": "300", "name": "Biology"},
            {"code": "400", "name": "PYQ/DPP"},
            {"code": "500", "name": "General"},
            {"code": "600", "name": "Novels/Fictions"},
        ];

        this.deviceTypes = [
            {"code": "CB", "name": "Chromebook"},
            {"code": "LP", "name": "Laptop"},
            {"code": "TB", "name": "Tablet"}
        ];

        // Load data from localStorage or initialize with sample data
        this.books = this.loadData('books') || [
            {
                "id": "SCH01-BK500-001-C1",
                "schoolId": "01",
                "title": "JEE Main Mathematics",
                "author": "R.D. Sharma",
                "price": 450,
                "year": 2023,
                "category": "500",
                "copies": 5,
                "available": 3
            }
        ];

        this.devices = this.loadData('devices') || [
            {
                "id": "SCH01-DVCB-001",
                "schoolId": "01",
                "name": "HP Chromebook 14",
                "type": "CB",
                "specs": "4GB RAM, 64GB Storage",
                "status": "Available"
            }
        ];

        this.transactions = this.loadData('transactions') || [];

        this.init();
    }

    init() {
        this.populateDropdowns();
        this.setupEventListeners();
        this.updateUI();
        this.updateDashboard();
        
        // Set today's date as default for date inputs
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('lendDate').value = today;
        document.getElementById('returnDate').value = today;
    }

    loadData(key) {
        try {
            const data = localStorage.getItem(`libraryTracker_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error loading ${key}:`, error);
            return null;
        }
    }

    saveData(key, data) {
        try {
            localStorage.setItem(`libraryTracker_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
        }
    }

    populateDropdowns() {
        // Populate school selector
        const schoolSelect = document.getElementById('schoolSelect');
        schoolSelect.innerHTML = '<option value="">Select School</option>';
        this.schools.forEach(school => {
            const option = document.createElement('option');
            option.value = school.id;
            option.textContent = `${school.name} - ${school.location}`;
            schoolSelect.appendChild(option);
        });

        // Populate book categories
        const categorySelect = document.getElementById('bookCategory');
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        this.bookCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.code;
            option.textContent = `${category.code} - ${category.name}`;
            categorySelect.appendChild(option);
        });

        // Populate device types
        const deviceTypeSelect = document.getElementById('deviceType');
        deviceTypeSelect.innerHTML = '<option value="">Select Type</option>';
        this.deviceTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.code;
            option.textContent = type.name;
            deviceTypeSelect.appendChild(option);
        });
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav__tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Mode toggle
        document.getElementById('booksMode').addEventListener('click', () => this.setMode('books'));
        document.getElementById('devicesMode').addEventListener('click', () => this.setMode('devices'));

        // School selection
        document.getElementById('schoolSelect').addEventListener('change', (e) => {
            this.currentSchool = e.target.value;
            this.updateUI();
            this.updateDashboard();
        });

        // Form submissions
        document.getElementById('addItemForm').addEventListener('submit', (e) => this.handleAddItem(e));
        document.getElementById('lendingForm').addEventListener('submit', (e) => this.handleLending(e));
        document.getElementById('returnsForm').addEventListener('submit', (e) => this.handleReturn(e));

        // Search functionality
        document.getElementById('searchItem').addEventListener('input', (e) => this.searchItems(e.target.value));
        document.getElementById('searchTransaction').addEventListener('input', (e) => this.searchTransactions(e.target.value));

        // Modal events
        document.getElementById('modalConfirm').addEventListener('click', () => this.confirmAction());
        document.getElementById('modalCancel').addEventListener('click', () => this.hideModal());

        // Report period change
        document.getElementById('reportPeriod').addEventListener('change', () => this.updateReports());
    }

    setMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        document.getElementById('booksMode').className = mode === 'books' ? 'btn btn--primary btn--sm' : 'btn btn--outline btn--sm';
        document.getElementById('devicesMode').className = mode === 'devices' ? 'btn btn--primary btn--sm' : 'btn btn--outline btn--sm';
        
        // Update UI labels and forms
        this.updateUI();
        this.updateDashboard();
    }

    updateUI() {
        const itemType = this.currentMode === 'books' ? 'Book' : 'Device';
        
        // Update labels
        document.getElementById('itemTypeLabel').textContent = itemType;
        document.getElementById('addButtonLabel').textContent = itemType;
        document.getElementById('lendTypeLabel').textContent = itemType;
        document.getElementById('returnTypeLabel').textContent = itemType;

        // Show/hide form sections
        const bookFields = document.getElementById('bookFields');
        const deviceFields = document.getElementById('deviceFields');
        
        if (this.currentMode === 'books') {
            bookFields.style.display = 'block';
            deviceFields.style.display = 'none';
            this.setRequiredFields(bookFields, true);
            this.setRequiredFields(deviceFields, false);
        } else {
            bookFields.style.display = 'none';
            deviceFields.style.display = 'block';
            this.setRequiredFields(bookFields, false);
            this.setRequiredFields(deviceFields, true);
        }

        // Update search placeholder
        const searchItem = document.getElementById('searchItem');
        searchItem.placeholder = `Search ${itemType.toLowerCase()}s by title, author, or ID`;

        // Clear search results
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('transactionResults').innerHTML = '';
        
        this.displayActiveTransactions();
    }

    setRequiredFields(container, required) {
        const inputs = container.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (required) {
                input.setAttribute('required', '');
            } else {
                input.removeAttribute('required');
            }
        });
    }

    switchTab(tabName) {
        // Update tab states
        document.querySelectorAll('.nav__tab').forEach(tab => {
            tab.classList.remove('nav__tab--active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('nav__tab--active');

        // Show/hide tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('tab-content--active');
        });
        document.getElementById(tabName).classList.add('tab-content--active');

        // Update specific tabs
        if (tabName === 'reports') {
            this.updateReports();
        } else if (tabName === 'returns') {
            this.displayActiveTransactions();
        }
    }

    generateUniqueId(type) {
        if (!this.currentSchool) {
            throw new Error('Please select a school first');
        }

        const school = this.currentSchool.padStart(2, '0');
        
        if (type === 'book') {
            const category = document.getElementById('bookCategory').value;
            const existingBooks = this.books.filter(book => 
                book.schoolId === this.currentSchool && book.category === category
            ).length;
            const sequential = (existingBooks + 1).toString().padStart(3, '0');
            return `SCH${school}-BK${category}-${sequential}`;
        } else {
            const deviceType = document.getElementById('deviceType').value;
            const existingDevices = this.devices.filter(device => 
                device.schoolId === this.currentSchool && device.type === deviceType
            ).length;
            const sequential = (existingDevices + 1).toString().padStart(3, '0');
            return `SCH${school}-DV${deviceType}-${sequential}`;
        }
    }

    handleAddItem(e) {
        e.preventDefault();
        
        if (!this.currentSchool) {
            this.showNotification('Please select a school first', 'error');
            return;
        }

        try {
            if (this.currentMode === 'books') {
                this.addBook();
            } else {
                this.addDevice();
            }
            
            e.target.reset();
            this.updateDashboard();
            this.showNotification(`${this.currentMode === 'books' ? 'Book' : 'Device'} added successfully!`, 'success');
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    addBook() {
        const baseId = this.generateUniqueId('book');
        const copies = parseInt(document.getElementById('bookCopies').value);
        
        const bookData = {
            schoolId: this.currentSchool,
            title: document.getElementById('bookTitle').value,
            author: document.getElementById('bookAuthor').value,
            price: parseInt(document.getElementById('bookPrice').value),
            year: parseInt(document.getElementById('bookYear').value),
            category: document.getElementById('bookCategory').value,
            copies: copies,
            available: copies
        };

        for (let i = 1; i <= copies; i++) {
            const book = {
                ...bookData,
                id: `${baseId}-C${i}`,
                copyNumber: i
            };
            this.books.push(book);
        }

        this.saveData('books', this.books);
    }

    addDevice() {
        const device = {
            id: this.generateUniqueId('device'),
            schoolId: this.currentSchool,
            name: document.getElementById('deviceName').value,
            type: document.getElementById('deviceType').value,
            specs: document.getElementById('deviceSpecs').value,
            status: 'Available'
        };

        this.devices.push(device);
        this.saveData('devices', this.devices);
    }

    searchItems(query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (!query.trim() || !this.currentSchool) {
            resultsContainer.innerHTML = '';
            return;
        }

        const items = this.currentMode === 'books' ? 
            this.books.filter(book => book.schoolId === this.currentSchool && book.available > 0) :
            this.devices.filter(device => device.schoolId === this.currentSchool && device.status === 'Available');

        const filteredItems = items.filter(item => {
            const searchText = query.toLowerCase();
            if (this.currentMode === 'books') {
                return item.title.toLowerCase().includes(searchText) ||
                       item.author.toLowerCase().includes(searchText) ||
                       item.id.toLowerCase().includes(searchText);
            } else {
                return item.name.toLowerCase().includes(searchText) ||
                       item.id.toLowerCase().includes(searchText) ||
                       (item.specs && item.specs.toLowerCase().includes(searchText));
            }
        });

        this.renderSearchResults(filteredItems, resultsContainer);
    }

    renderSearchResults(items, container) {
        if (items.length === 0) {
            container.innerHTML = '<p>No items found</p>';
            return;
        }

        container.innerHTML = items.map(item => {
            const isSelected = this.selectedItem && this.selectedItem.id === item.id;
            
            if (this.currentMode === 'books') {
                return `
                    <div class="search-item ${isSelected ? 'search-item--selected' : ''}" 
                         onclick="app.selectItem('${item.id}')">
                        <div class="search-item__title">${item.title}</div>
                        <div class="search-item__details">
                            Author: ${item.author} | Year: ${item.year} | Available: ${item.available}
                        </div>
                        <div class="search-item__status">ID: ${item.id}</div>
                    </div>
                `;
            } else {
                return `
                    <div class="search-item ${isSelected ? 'search-item--selected' : ''}" 
                         onclick="app.selectItem('${item.id}')">
                        <div class="search-item__title">${item.name}</div>
                        <div class="search-item__details">
                            Type: ${this.getDeviceTypeName(item.type)} | ${item.specs || 'No specs'}
                        </div>
                        <div class="search-item__status">ID: ${item.id}</div>
                    </div>
                `;
            }
        }).join('');
    }

    selectItem(itemId) {
        const items = this.currentMode === 'books' ? this.books : this.devices;
        this.selectedItem = items.find(item => item.id === itemId);
        
        // Update search results display
        document.querySelectorAll('.search-item').forEach(item => {
            item.classList.remove('search-item--selected');
        });
        
        event.target.closest('.search-item').classList.add('search-item--selected');
    }

    handleLending(e) {
        e.preventDefault();
        
        if (!this.selectedItem) {
            this.showNotification('Please select an item first', 'error');
            return;
        }

        if (!this.currentSchool) {
            this.showNotification('Please select a school first', 'error');
            return;
        }

        const transaction = {
            id: this.generateTransactionId(),
            itemId: this.selectedItem.id,
            itemType: this.currentMode,
            itemTitle: this.currentMode === 'books' ? this.selectedItem.title : this.selectedItem.name,
            studentApaarId: document.getElementById('studentApaarId').value,
            studentName: document.getElementById('studentName').value,
            teacherName: document.getElementById('teacherName').value,
            lendDate: document.getElementById('lendDate').value,
            expectedReturnDate: document.getElementById('expectedReturnDate').value,
            returnDate: null,
            schoolId: this.currentSchool,
            status: 'Active'
        };

        this.transactions.push(transaction);
        
        // Update item availability
        if (this.currentMode === 'books') {
            const book = this.books.find(b => b.id === this.selectedItem.id);
            if (book) book.available--;
        } else {
            const device = this.devices.find(d => d.id === this.selectedItem.id);
            if (device) device.status = 'Borrowed';
        }

        this.saveData('transactions', this.transactions);
        this.saveData(this.currentMode === 'books' ? 'books' : 'devices', 
                     this.currentMode === 'books' ? this.books : this.devices);

        // Reset form and update UI
        e.target.reset();
        document.getElementById('searchResults').innerHTML = '';
        this.selectedItem = null;
        this.updateDashboard();
        this.displayActiveTransactions();
        
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('lendDate').value = today;
        
        this.showNotification('Item lent successfully!', 'success');
    }

    generateTransactionId() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substr(2, 5).toUpperCase();
        return `TXN${timestamp.slice(-6)}${random}`;
    }

    searchTransactions(query) {
        const resultsContainer = document.getElementById('transactionResults');
        
        if (!query.trim() || !this.currentSchool) {
            resultsContainer.innerHTML = '';
            return;
        }

        const activeTransactions = this.transactions.filter(txn => 
            txn.schoolId === this.currentSchool && 
            txn.status === 'Active' &&
            txn.itemType === this.currentMode
        );

        const filteredTransactions = activeTransactions.filter(txn => {
            const searchText = query.toLowerCase();
            return txn.studentApaarId.toLowerCase().includes(searchText) ||
                   txn.studentName.toLowerCase().includes(searchText) ||
                   txn.id.toLowerCase().includes(searchText) ||
                   txn.itemTitle.toLowerCase().includes(searchText);
        });

        this.renderTransactionResults(filteredTransactions, resultsContainer);
    }

    renderTransactionResults(transactions, container) {
        if (transactions.length === 0) {
            container.innerHTML = '<p>No transactions found</p>';
            return;
        }

        container.innerHTML = transactions.map(txn => {
            const isSelected = this.selectedTransaction && this.selectedTransaction.id === txn.id;
            const lendDate = new Date(txn.lendDate).toLocaleDateString();
            
            return `
                <div class="search-item ${isSelected ? 'search-item--selected' : ''}" 
                     onclick="app.selectTransaction('${txn.id}')">
                    <div class="search-item__title">${txn.itemTitle}</div>
                    <div class="search-item__details">
                        Student: ${txn.studentName} (${txn.studentApaarId}) | Lent: ${lendDate}
                    </div>
                    <div class="search-item__status">Transaction ID: ${txn.id}</div>
                </div>
            `;
        }).join('');
    }

    selectTransaction(transactionId) {
        this.selectedTransaction = this.transactions.find(txn => txn.id === transactionId);
        
        // Update display
        document.querySelectorAll('#transactionResults .search-item').forEach(item => {
            item.classList.remove('search-item--selected');
        });
        
        if (event.target.closest('.search-item')) {
            event.target.closest('.search-item').classList.add('search-item--selected');
        }
    }

    handleReturn(e) {
        e.preventDefault();
        
        if (!this.selectedTransaction) {
            this.showNotification('Please select a transaction first', 'error');
            return;
        }

        const returnDate = document.getElementById('returnDate').value;
        const condition = document.getElementById('condition').value;

        // Update transaction
        this.selectedTransaction.returnDate = returnDate;
        this.selectedTransaction.condition = condition;
        this.selectedTransaction.status = 'Completed';

        // Update item availability
        if (this.selectedTransaction.itemType === 'books') {
            const book = this.books.find(b => b.id === this.selectedTransaction.itemId);
            if (book) book.available++;
        } else {
            const device = this.devices.find(d => d.id === this.selectedTransaction.itemId);
            if (device) device.status = 'Available';
        }

        this.saveData('transactions', this.transactions);
        this.saveData(this.currentMode === 'books' ? 'books' : 'devices', 
                     this.currentMode === 'books' ? this.books : this.devices);

        // Reset form and update UI
        e.target.reset();
        document.getElementById('transactionResults').innerHTML = '';
        this.selectedTransaction = null;
        this.updateDashboard();
        this.displayActiveTransactions();
        
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('returnDate').value = today;
        
        this.showNotification('Item returned successfully!', 'success');
    }

    displayActiveTransactions() {
        const container = document.getElementById('transactionsList');
        
        if (!this.currentSchool) {
            container.innerHTML = '<p>Please select a school</p>';
            return;
        }

        const activeTransactions = this.transactions.filter(txn => 
            txn.schoolId === this.currentSchool && 
            txn.status === 'Active' &&
            txn.itemType === this.currentMode
        );

        if (activeTransactions.length === 0) {
            container.innerHTML = '<p>No active transactions</p>';
            return;
        }

        container.innerHTML = activeTransactions.map(txn => {
            const lendDate = new Date(txn.lendDate).toLocaleDateString();
            const isOverdue = txn.expectedReturnDate && new Date(txn.expectedReturnDate) < new Date();
            
            return `
                <div class="transaction-item">
                    <div class="transaction-item__info">
                        <h4>${txn.itemTitle}</h4>
                        <p>Student: ${txn.studentName} (${txn.studentApaarId})</p>
                        <p>Teacher: ${txn.teacherName}</p>
                        <p>Lent: ${lendDate} ${isOverdue ? '<span class="status status--overdue">OVERDUE</span>' : ''}</p>
                    </div>
                    <div class="transaction-item__actions">
                        <button class="btn btn--sm btn--primary" 
                                onclick="app.quickReturn('${txn.id}')">
                            Quick Return
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    quickReturn(transactionId) {
        const transaction = this.transactions.find(txn => txn.id === transactionId);
        if (!transaction) return;

        this.selectedTransaction = transaction;
        
        // Set today's date and good condition as defaults
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('returnDate').value = today;
        document.getElementById('condition').value = 'Good';
        
        // Process return
        const event = { preventDefault: () => {} };
        this.handleReturn(event);
        
        this.switchTab('returns');
    }

    updateDashboard() {
        if (!this.currentSchool) {
            this.resetDashboard();
            return;
        }

        const items = this.currentMode === 'books' ? 
            this.books.filter(book => book.schoolId === this.currentSchool) :
            this.devices.filter(device => device.schoolId === this.currentSchool);

        const activeTransactions = this.transactions.filter(txn => 
            txn.schoolId === this.currentSchool && 
            txn.status === 'Active' &&
            txn.itemType === this.currentMode
        );

        let totalItems, availableItems, borrowedItems, overdueItems;

        if (this.currentMode === 'books') {
            totalItems = items.reduce((sum, book) => sum + book.copies, 0);
            availableItems = items.reduce((sum, book) => sum + book.available, 0);
            borrowedItems = totalItems - availableItems;
        } else {
            totalItems = items.length;
            availableItems = items.filter(device => device.status === 'Available').length;
            borrowedItems = items.filter(device => device.status === 'Borrowed').length;
        }

        // Calculate overdue items
        overdueItems = activeTransactions.filter(txn => 
            txn.expectedReturnDate && new Date(txn.expectedReturnDate) < new Date()
        ).length;

        // Update dashboard stats
        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('availableItems').textContent = availableItems;
        document.getElementById('borrowedItems').textContent = borrowedItems;
        document.getElementById('overdueItems').textContent = overdueItems;

        // Update recent activity
        this.updateRecentActivity();
    }

    resetDashboard() {
        document.getElementById('totalItems').textContent = '0';
        document.getElementById('availableItems').textContent = '0';
        document.getElementById('borrowedItems').textContent = '0';
        document.getElementById('overdueItems').textContent = '0';
        
        document.getElementById('recentActivity').innerHTML = '<p class="activity-item">Please select a school</p>';
    }

    updateRecentActivity() {
        const container = document.getElementById('recentActivity');
        
        const recentTransactions = this.transactions
            .filter(txn => txn.schoolId === this.currentSchool && txn.itemType === this.currentMode)
            .sort((a, b) => new Date(b.lendDate) - new Date(a.lendDate))
            .slice(0, 5);

        if (recentTransactions.length === 0) {
            container.innerHTML = '<p class="activity-item">No recent activity</p>';
            return;
        }

        container.innerHTML = recentTransactions.map(txn => {
            const date = new Date(txn.lendDate).toLocaleDateString();
            const action = txn.status === 'Active' ? 'Lent' : 'Returned';
            
            return `
                <div class="activity-item">
                    ${action}: ${txn.itemTitle} to ${txn.studentName} on ${date}
                </div>
            `;
        }).join('');
    }

    updateReports() {
        if (!this.currentSchool) return;

        const period = parseInt(document.getElementById('reportPeriod').value);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - period);

        const periodTransactions = this.transactions.filter(txn => 
            txn.schoolId === this.currentSchool && 
            txn.itemType === this.currentMode &&
            new Date(txn.lendDate) >= cutoffDate
        );

        this.renderUsageChart(periodTransactions);
        this.renderPopularChart(periodTransactions);
        this.renderTopBorrowers(periodTransactions);
        this.renderSchoolPerformance();
    }

    renderUsageChart(transactions) {
        const ctx = document.getElementById('usageChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.usageChart) {
            window.usageChart.destroy();
        }

        const days = [];
        const counts = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            counts.push(transactions.filter(txn => txn.lendDate === dateStr).length);
        }

        window.usageChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Items Lent',
                    data: counts,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    renderPopularChart(transactions) {
        const ctx = document.getElementById('popularChart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.popularChart) {
            window.popularChart.destroy();
        }

        const itemCounts = {};
        transactions.forEach(txn => {
            itemCounts[txn.itemTitle] = (itemCounts[txn.itemTitle] || 0) + 1;
        });

        const sortedItems = Object.entries(itemCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const labels = sortedItems.map(item => item[0]);
        const data = sortedItems.map(item => item[1]);

        window.popularChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Times Borrowed',
                    data: data,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    renderTopBorrowers(transactions) {
        const container = document.getElementById('topBorrowers');
        
        const borrowerCounts = {};
        transactions.forEach(txn => {
            const key = `${txn.studentName} (${txn.studentApaarId})`;
            borrowerCounts[key] = (borrowerCounts[key] || 0) + 1;
        });

        const sortedBorrowers = Object.entries(borrowerCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        if (sortedBorrowers.length === 0) {
            container.innerHTML = '<p>No data available</p>';
            return;
        }

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Items Borrowed</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedBorrowers.map(([student, count]) => `
                        <tr>
                            <td>${student}</td>
                            <td>${count}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderSchoolPerformance() {
        const container = document.getElementById('schoolPerformance');
        
        const schoolStats = this.schools.map(school => {
            const schoolTransactions = this.transactions.filter(txn => 
                txn.schoolId === school.id && txn.itemType === this.currentMode
            );
            
            return {
                name: school.name,
                transactions: schoolTransactions.length
            };
        }).sort((a, b) => b.transactions - a.transactions).slice(0, 5);

        if (schoolStats.every(stat => stat.transactions === 0)) {
            container.innerHTML = '<p>No data available</p>';
            return;
        }

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Total Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    ${schoolStats.map(stat => `
                        <tr>
                            <td>${stat.name}</td>
                            <td>${stat.transactions}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    getDeviceTypeName(code) {
        const type = this.deviceTypes.find(t => t.code === code);
        return type ? type.name : code;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;

        const container = document.getElementById('notifications');
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showModal(title, message, onConfirm) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('confirmModal').classList.remove('hidden');
        
        this.pendingAction = onConfirm;
    }

    hideModal() {
        document.getElementById('confirmModal').classList.add('hidden');
        this.pendingAction = null;
    }

    confirmAction() {
        if (this.pendingAction) {
            this.pendingAction();
            this.pendingAction = null;
        }
        this.hideModal();
    }
}

// Global functions for onclick handlers
function switchTab(tabName) {
    app.switchTab(tabName);
}

// Initialize the application
const app = new LibraryTracker();

// Make app globally accessible for onclick handlers
window.app = app;
