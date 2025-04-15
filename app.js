// app.js - SplitMyBill
// Modular JS, ES6+, all journeys in one page

// App State
const state = {
  step: 0, // 0: landing, 1: friends form, 2: summary
  numFriends: 0,
  friends: [],
  splitResult: null
};

// Constant: Default zero value formatted to locale
const DEFAULT_ZERO = (0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Utility: Animate scroll to element
function scrollToApp() {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}

// Utility: Vibrant Easter egg
function nerdyEasterEgg() {
  if (Math.random() < 0.1) {
    alert('🦄 You found a secret! May your bills always be evenly split.');
  }
}

// Utility: Format number according to locale
function formatNumberLocale(value) {
  let num;
  if (typeof value === 'string') {
    num = parseLocaleNumber(value);
  } else {
    num = Number(value);
  }
  
  if (isNaN(num) || value === '' || value == null) return DEFAULT_ZERO;
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Utility: Parse a locale-formatted number string to float
function parseLocaleNumber(str) {
  if (typeof str !== 'string') return 0;
  
  const decimalSeparator = getLocaleDecimalSeparator();
  let cleaned = str.replace(/[^\d.,-]/g, '');
  
  if (decimalSeparator === ',') {
    const lastCommaIndex = cleaned.lastIndexOf(',');
    if (lastCommaIndex !== -1) {
      cleaned = cleaned.substring(0, lastCommaIndex).replace(/\./g, '').replace(/,/g, '') + 
               '.' + cleaned.substring(lastCommaIndex + 1);
    } else {
      cleaned = cleaned.replace(/\./g, '');
    }
  } else {
    cleaned = cleaned.replace(/,/g, '');
  }
  
  let num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

// Utility: Get locale decimal separator
function getLocaleDecimalSeparator() {
  return (1.1).toLocaleString().replace(/\d/g, '').charAt(0);
}

// Utility: Build locale-aware regex for number validation
function getLocaleNumberRegex() {
  const sep = getLocaleDecimalSeparator();
  if (sep === ',') {
    return /^-?\d{1,3}(\.\d{3})*(,\d{0,2})?$|^-?\d+(,\d{0,2})?$/;
  } else {
    return /^-?\d{1,3}(,\d{3})*(\.\d{0,2})?$|^-?\d+(\.\d{0,2})?$/;
  }
}

// Render Landing Page
function renderLanding() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="animate__animated animate__fadeInDown" aria-labelledby="title">
      <h1 id="title" style="font-family: var(--font-mono); color: var(--color-primary); font-size: 2.5rem;">SplitMyBill <span title='A nerdy way to split bills!'>💸</span></h1>
      <p style="font-size:1.1rem;">How Many Friends to Split the Bill?</p>
      
      <select id="num-friends" aria-label="Number of friends" style="font-size:1.2rem;">
        <option value="" selected</option>
        ${Array.from({length: 19}, (_, i) => `<option value="${i+2}">${i+2}</option>`).join('')}
      </select>
      <div id="landing-helper" style="margin-top:1rem; color:var(--color-accent); font-size:0.95rem;">
        <span title="Hint: Try 42 for a surprise!">Need help? Hover for a nerdy tip.</span>
      </div>
    </section>
  `;
  document.getElementById('num-friends').addEventListener('change', e => {
    const val = parseInt(e.target.value, 10);
    if (val >= 2) {
      state.numFriends = val;
      nerdyEasterEgg();
      renderFriendsForm();
      scrollToApp();
    }
  });
}

// Render Friends/Expense Form
function renderFriendsForm() {
  state.step = 1;
  if (!state.friends.length) {
    state.friends = Array.from({ length: state.numFriends }, (_, i) => ({
      name: `Friend${i + 1}`,
      bills: [DEFAULT_ZERO, DEFAULT_ZERO]
    }));
  }
  const app = document.getElementById('app');
  app.innerHTML = `
    <nav aria-label="Breadcrumb" style="margin-bottom:1rem;">
      <ol style="display:flex;gap:0.5rem;list-style:none;padding:0;">
        <li><button aria-label="Back to landing" onclick="window.location.reload()" style="background:none;border:none;color:var(--color-accent);cursor:pointer;">🏠 Home</button></li>
        <li aria-current="page">➔ Friends & Bills</li>
      </ol>
    </nav>
    <section class="animate__animated animate__fadeInUp">
      <h2 style="font-family:var(--font-mono);color:var(--color-primary);">Enter Friends & Expenses</h2>
      <div class="friends-grid" role="table" aria-label="Friends and their bills">
        <div role="row" style="font-weight:bold;">Friend</div>
        <div role="row" style="font-weight:bold;">Bills</div>
        <div role="row" style="font-weight:bold;">Total</div>
        ${state.friends.map((friend, idx) => `
          <div role="cell">
            <input type="text" aria-label="Friend name" value="${friend.name}" data-friend-idx="${idx}" class="friend-name" style="width:100%;font-family:var(--font-mono);" maxlength="20" />
          </div>
          <div role="cell" style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;min-width:340px;">
            ${friend.bills.map((bill, bIdx) => `
              <input type="text" aria-label="Bill amount" value="${formatNumberLocale(bill)}" data-friend-idx="${idx}" data-bill-idx="${bIdx}" class="bill-input" style="width:120px;text-align:right;" maxlength="12" inputmode="decimal" pattern="^\\d{0,9}(,?\\d{3})*(\\.\\d{0,2})?$" />
            `).join('')}
            ${friend.bills.length < 10 ? `<button aria-label="Add bill" class="add-bill-btn" data-friend-idx="${idx}" style="background:none;border:none;color:var(--color-secondary);font-size:1.5rem;cursor:pointer;align-self:center;" title="Add another bill for ${friend.name}"><i class="ph ph-plus-circle"></i></button>` : ''}
          </div>
          <div role="cell" class="friend-total" id="friend-total-${idx}" style="font-weight:bold;">${calcFriendTotal(friend.bills)}</div>
        `).join('')}
      </div>
      <div style="margin-top:2rem;display:flex;gap:1rem;justify-content:center;">
        <button id="split-evenly" class="animate__animated animate__bounceIn" style="background:var(--color-primary);color:white;">Split Evenly</button>
        <button id="reset-amounts" style="background:var(--color-secondary);color:white;">Reset Amounts</button>
        <button id="start-over" style="background:var(--color-accent);color:white;">Start Over</button>
      </div>
      <div style="margin-top:1rem;color:var(--color-accent);font-size:0.95rem;">
        <span title="Nerdy tip: Use keyboard arrows to move between bills!">Tip: Double-click a total for a nerdy joke.</span>
      </div>
    </section>
  `;
  document.querySelectorAll('.friend-name').forEach(input => {
    input.addEventListener('input', e => {
      const idx = +e.target.dataset.friendIdx;
      state.friends[idx].name = e.target.value || `Friend${idx+1}`;
    });
  });
  document.querySelectorAll('.bill-input').forEach(input => {
    input.addEventListener('blur', e => {
      let val = e.target.value.trim();
      if (val === '') {
        val = DEFAULT_ZERO;
        e.target.value = val;
        const fIdx = +e.target.dataset.friendIdx;
        const bIdx = +e.target.dataset.billIdx;
        state.friends[fIdx].bills[bIdx] = val;
        document.getElementById(`friend-total-${fIdx}`).textContent = calcFriendTotal(state.friends[fIdx].bills);
        return;
      }
      const num = parseLocaleNumber(val);
      const localeRegex = getLocaleNumberRegex();
      if (!localeRegex.test(val)) {
        val = formatNumberLocale(num);
        e.target.value = val;
      }
      const fIdx = +e.target.dataset.friendIdx;
      const bIdx = +e.target.dataset.billIdx;
      state.friends[fIdx].bills[bIdx] = val;
      document.getElementById(`friend-total-${fIdx}`).textContent = calcFriendTotal(state.friends[fIdx].bills);
    });
    input.addEventListener('input', e => {
      let val = e.target.value.trim();
      if (val === '') {
        e.target.setCustomValidity('');
        return;
      }
      const decimalSeparator = getLocaleDecimalSeparator();
      const example = (1234.56).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
      const inputRegex = decimalSeparator === ',' 
        ? /^-?\d{1,}(\.\d{3})*?(,\d{0,2})?$/ 
        : /^-?\d{1,}(,\d{3})*?(\.\d{0,2})?$/;
      if (!inputRegex.test(val)) {
        e.target.setCustomValidity(`Please enter a valid amount, e.g. ${example}`);
        e.target.reportValidity();
      } else {
        e.target.setCustomValidity('');
      }
    });
  });
  document.querySelectorAll('.add-bill-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = +btn.dataset.friendIdx;
      if (state.friends[idx].bills.length < 10) {
        state.friends[idx].bills.push(DEFAULT_ZERO);
        const billsCell = btn.parentElement;
        const bIdx = state.friends[idx].bills.length - 1;
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.setAttribute('aria-label', 'Bill amount');
        newInput.value = DEFAULT_ZERO;
        newInput.dataset.friendIdx = idx;
        newInput.dataset.billIdx = bIdx;
        newInput.className = 'bill-input';
        newInput.style.width = '120px';
        newInput.style.textAlign = 'right';
        newInput.maxLength = 12;
        newInput.setAttribute('inputmode', 'decimal');
        newInput.setAttribute('pattern', '^\\d{0,9}(,?\\d{3})*(\\.\\d{0,2})?$');
        billsCell.insertBefore(newInput, btn);
        // Attach the same input and blur handlers as the original bill inputs
        newInput.addEventListener('input', function(e) {
          let val = e.target.value.trim();
          if (val === '') {
            e.target.setCustomValidity('');
            return;
          }
          const decimalSeparator = getLocaleDecimalSeparator();
          const example = (1234.56).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
          const inputRegex = decimalSeparator === ',' 
            ? /^-?\d{1,}(\.\d{3})*?(,\d{0,2})?$/ 
            : /^-?\d{1,}(,\d{3})*?(\.\d{0,2})?$/;
          if (!inputRegex.test(val)) {
            e.target.setCustomValidity(`Please enter a valid amount, e.g. ${example}`);
            e.target.reportValidity();
          } else {
            e.target.setCustomValidity('');
          }
        });
        newInput.addEventListener('blur', function(e) {
          let val = e.target.value.trim();
          if (val === '') {
            val = DEFAULT_ZERO;
            e.target.value = val;
            const fIdx = +e.target.dataset.friendIdx;
            const bIdx = +e.target.dataset.billIdx;
            state.friends[fIdx].bills[bIdx] = val;
            document.getElementById(`friend-total-${fIdx}`).textContent = calcFriendTotal(state.friends[fIdx].bills);
            return;
          }
          const num = parseLocaleNumber(val);
          const localeRegex = getLocaleNumberRegex();
          if (!localeRegex.test(val)) {
            val = formatNumberLocale(num);
            e.target.value = val;
          }
          const fIdx = +e.target.dataset.friendIdx;
          const bIdx = +e.target.dataset.billIdx;
          state.friends[fIdx].bills[bIdx] = val;
          document.getElementById(`friend-total-${fIdx}`).textContent = calcFriendTotal(state.friends[fIdx].bills);
        });
        document.getElementById(`friend-total-${idx}`).textContent = calcFriendTotal(state.friends[idx].bills);
        if (state.friends[idx].bills.length >= 10) btn.style.display = 'none';
        // Focus the newly created input
        newInput.focus();
      }
    });
  });
  document.querySelectorAll('.friend-total').forEach((cell, idx) => {
    cell.addEventListener('dblclick', () => {
      cell.textContent = '42 is the answer!';
      setTimeout(() => cell.textContent = calcFriendTotal(state.friends[idx].bills), 1200);
    });
  });
  document.getElementById('split-evenly').addEventListener('click', () => {
    if (validateBills()) {
      renderSummary();
      scrollToApp();
    }
  });
  document.getElementById('reset-amounts').addEventListener('click', () => {
    state.friends.forEach(f => f.bills = [DEFAULT_ZERO, DEFAULT_ZERO]);
    renderFriendsForm();
  });
  document.getElementById('start-over').addEventListener('click', () => {
    state.step = 0;
    state.numFriends = 0;
    state.friends = [];
    state.splitResult = null;
    renderLanding();
    scrollToApp();
  });
}

function calcFriendTotal(bills) {
  const total = bills.reduce((sum, b) => {
    const parsed = parseLocaleNumber(b);
    return sum + parsed;
  }, 0);
  return formatNumberLocale(total);
}

function validateBills() {
  let valid = true;
  const example = (1234.56).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
  const localeRegex = getLocaleNumberRegex();
  state.friends.forEach((f, idx) => {
    f.bills.forEach((b, bIdx) => {
      if (!localeRegex.test(b)) {
        alert(`Error: Bill for ${f.name} #${bIdx+1} is not valid. Value: ${b}. Please enter a valid amount, e.g. ${example}`);
        valid = false;
      }
    });
  });
  return valid;
}

// Render Calculation Summary
function renderSummary() {
  state.step = 2;
  const totals = state.friends.map(f => f.bills.reduce((sum, b) => sum + parseLocaleNumber(b), 0));
  const totalSum = totals.reduce((a, b) => a + b, 0);
  const avg = totalSum / state.numFriends;
  state.splitResult = calculateSettlements(totals, avg);
  const totalSumStr = formatNumberLocale(totalSum);
  const avgStr = formatNumberLocale(avg);
  const app = document.getElementById('app');
  app.innerHTML = `
    <nav aria-label="Breadcrumb" style="margin-bottom:1rem;">
      <ol style="display:flex;gap:0.5rem;list-style:none;padding:0;">
        <li><button aria-label="Back to friends form" id="back-to-form" style="background:none;border:none;color:var(--color-accent);cursor:pointer;">👈 Back</button></li>
        <li aria-current="page">➔ Summary</li>
      </ol>
    </nav>
    <section class="animate__animated animate__fadeInUp">
      <h2 style="font-family:var(--font-mono);color:var(--color-primary);">Calculation Summary</h2>
      <div style="margin-bottom:1.5rem;">
        <h3 style="font-size:1.1rem;">Total Spent by Each:</h3>
        <ul style="list-style:none;padding:0;">
          ${state.friends.map((f, idx) => {
            const billParts = f.bills
              .filter(b => parseLocaleNumber(b) !== 0)
              .map(b => `${formatNumberLocale(parseLocaleNumber(b))}`)
              .join(' + ');
            const total = formatNumberLocale(totals[idx]);
            return `<li style="margin-bottom:0.5rem;font-family:var(--font-mono);font-size:1rem;">
              <span style="color:var(--color-primary);">${f.name}</span>:
              <span>${billParts ? billParts + ' = ' : ''}</span>
              <strong style="color:var(--color-accent);">$${total}</strong>
            </li>`;
          }).join('')}
        </ul>
      </div>
      <div style="margin-bottom:1.5rem;">
        <div>
          <h3 style="font-size:1.1rem;display:inline;">Total Spent:</h3>
          <strong style="color:var(--color-accent);margin-left:0.5rem;">$${totalSumStr}</strong>
        </div>
        <div style="margin-top:0.5rem;">
          <h3 style="font-size:1.1rem;display:inline;">Each Should Pay:</h3>
          <strong style="color:var(--color-secondary);margin-left:0.5rem;">$${avgStr}</strong>
        </div>
      </div>
      <div style="margin-bottom:2rem;">
        <h3 style="font-size:1.1rem;">Who Owes Whom?</h3>
        <ul style="list-style:none;padding:0;">
          ${state.splitResult.length === 0 ? `<li style='color:var(--color-accent);font-weight:bold;'>All bills are already even! 🥳</li>` : state.splitResult.map(o => `
            <li style="margin-bottom:0.5rem;">
              <span style="font-family:var(--font-mono);color:var(--color-primary);">${state.friends[o.from].name}</span>
              owes
              <span style="font-family:var(--font-mono);color:var(--color-secondary);">${state.friends[o.to].name}</span>
              <strong style="color:var(--color-accent);">$${o.amount.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</strong>
            </li>
          `).join('')}
        </ul>
      </div>
      <div style="margin-top:2rem;">
        <button id="back-to-form2" style="background:var(--color-secondary);color:white;">Back to Edit</button>
        <button id="start-over" style="background:var(--color-primary);color:white;">Start Over</button>
      </div>
      <div style="margin-top:1.5rem;color:var(--color-accent);font-size:0.95rem;">
        <span title="Nerdy tip: Try splitting a bill of 42!">Tip: Hover for a nerdy reference.</span>
      </div>
    </section>
  `;
  document.getElementById('back-to-form').onclick = () => {
    renderFriendsForm();
    scrollToApp();
  };
  document.getElementById('back-to-form2').onclick = () => {
    renderFriendsForm();
    scrollToApp();
  };
  document.getElementById('start-over').onclick = () => {
    state.step = 0;
    state.numFriends = 0;
    state.friends = [];
    state.splitResult = null;
    renderLanding();
    scrollToApp();
  };
}

// Calculate minimal transactions to settle up
function calculateSettlements(totals, avg) {
  const net = totals.map(t => +(t - avg).toFixed(2));
  const result = [];
  let debtors = [], creditors = [];
  net.forEach((bal, idx) => {
    if (bal < -0.01) debtors.push({ idx, amt: -bal });
    else if (bal > 0.01) creditors.push({ idx, amt: bal });
  });
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amt, creditors[j].amt);
    result.push({ from: debtors[i].idx, to: creditors[j].idx, amount: pay });
    debtors[i].amt -= pay;
    creditors[j].amt -= pay;
    if (Math.abs(debtors[i].amt) < 0.01) i++;
    if (Math.abs(creditors[j].amt) < 0.01) j++;
  }
  return result;
}

// Initial render
renderLanding();