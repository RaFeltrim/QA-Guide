# Severity vs Priority: How Not to Fight with PO

## Introduction

One of the biggest challenges for beginner QAs is understanding the difference between severity and priority. Confusing these concepts can lead to unnecessary conflicts with Product Owners and developers.

## What is Severity?

**Severity** refers to the **technical impact** that a bug has on the system. It's an objective measure of the damage caused.

### Severity Levels:

**S1 - Critical/Blocker**
- System inaccessible
- Data loss
- Critical security flaw
- *Example:* User cannot log in

**S2 - High**
- Main functionality affected
- Complex workaround
- *Example:* Shopping cart doesn't calculate shipping

**S3 - Medium**
- Secondary functionality affected
- Simple workaround exists
- *Example:* Help button doesn't open modal

**S4 - Low/Trivial**
- Typographical errors
- Minor layout issues
- *Example:* Incorrect spacing between buttons

## What is Priority?

**Priority** refers to the **order of correction** defined by the business. It's a subjective decision based on user value.

### Priority Levels:

**P1 - Immediate**
- Immediate correction needed
- Affects users in production
- *Example:* Bug preventing sales

**P2 - High**
- Fix in next release
- Significant business impact
- *Example:* New functionality with bugs

**P3 - Medium**
- Fix in future releases
- Small user impact
- *Example:* Requested UX improvement

**P4 - Low**
- Optional correction
- Doesn't affect user experience
- *Example:* Minor aesthetic improvements

## Severity vs Priority Matrix

| Severity \ Priority | Immediate (P1) | High (P2) | Medium (P3) | Low (P4) |
|---------------------|----------------|-----------|-------------|----------|
| **Critical (S1)** | 🔴 Most common | 🟠 Possible | 🟡 Rare | ⚪ Almost impossible |
| **High (S2)** | 🔴 Common | 🟠 Most common | 🟡 Common | ⚪ Rare |
| **Medium (S3)** | 🟠 Possible | 🟡 Common | 🟢 Most common | ⚪ Common |
| **Low (S4)** | ⚪ Almost impossible | 🟡 Rare | 🟡 Possible | 🟢 Most common |

## Practical Examples

### Example 1: High Severity, Low Priority
**Bug:** Crash on advanced settings screen
**Severity:** S1 - Critical (system crashes)
**Priority:** P4 - Low (99% of users don't access)
**Decision:** Fix in future release

### Example 2: Low Severity, High Priority
**Bug:** Typo on checkout button
**Severity:** S4 - Low (just wrong text)
**Priority:** P1 - Immediate (affects sales conversion)
**Decision:** Fix immediately

### Example 3: High Severity, High Priority
**Bug:** User cannot complete payment
**Severity:** S1 - Critical (main functionality)
**Priority:** P1 - Immediate (direct financial loss)
**Decision:** Fix immediately

## How to Classify Correctly

### Evaluation Steps:

1. **Analyze Technical Impact**
   - How many users are affected?
   - How severe is the functional impact?
   - Is there a possible workaround?

2. **Understand Business Value**
   - What's the ROI impact?
   - Does it affect key metrics?
   - Is there stakeholder pressure?

3. **Validate with Stakeholders**
   - Discuss with PO/Product Manager
   - Consider product roadmap
   - Align delivery expectations

## Common Mistakes

❌ **Using severity as sole basis:** Ignoring business value
❌ **Classifying everything as critical:** Losing credibility with the team
❌ **Not validating with PO:** Creating unrealistic correction expectations
❌ **Poor documentation:** Not explaining classification rationale

## Best Practices

✅ **Clearly separate fields:** Never mix severity and priority
✅ **Justify classification:** Explain reasoning in bug report
✅ **Maintain consistency:** Use same scale throughout organization
✅ **Review periodically:** Adjust classifications based on learning

## Classification Template

```markdown
## Classification

**Severity:** S2 - High
**Justification:** Main functionality affected, complex workaround needed

**Priority:** P3 - Medium
**Justification:** Secondary functionality, doesn't block current release

**Involved stakeholders:** PO John, Dev Mary
**Validation date:** Dec 15, 2025
```

## Classification Checklist

- [ ] Objectively analyze technical impact
- [ ] Consider business value
- [ ] Validate classification with PO
- [ ] Clearly document justification
- [ ] Use consistent language
- [ ] Review with developers

## Conclusion

Understanding the difference between severity and priority is essential for effective communication with the team. Remember: high severity doesn't mean high priority, and vice versa. Dialogue with the Product Owner is fundamental to aligning expectations.

📚 **Want to dive deeper?** Check out our guide on [Bug Reports](../../02-NIVEL-ESTAGIARIO/02-bug-reports.md) and [Bug Triage](../../04-NIVEL-PLENO/07-shift-left-basico.md).

#QA #BugTriage #Severity #Priority #SoftwareTesting