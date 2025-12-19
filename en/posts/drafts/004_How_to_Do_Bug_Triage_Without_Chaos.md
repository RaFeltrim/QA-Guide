# How to Do Bug Triage Without Chaos

## Introduction

Bug triage is the process of analyzing, classifying, and prioritizing reported bugs. When done correctly, it organizes the flow of fixes and improves team efficiency. When done poorly, it becomes chaos that harms everyone.

## What is Bug Triage?

Bug triage is a regular meeting (daily or weekly) where the team:
- Analyzes new reported bugs
- Classifies severity and priority
- Assigns to developers
- Defines correction deadlines

## Structure of a Triage Session

### Essential Participants:
- **QA Lead:** Facilitates the session
- **Product Owner:** Defines business priorities
- **Tech Lead:** Evaluates technical complexity
- **Support Representative:** User context

### Recommended Agenda (30-45 min):

1. **Preparation (5 min)**
   - Review new bugs since last triage
   - Pre-filter obvious bugs

2. **Individual Analysis (25-35 min)**
   - Each bug in 2-3 minutes
   - Quick discussion when needed
   - Decision on classification

3. **Follow-up (5 min)**
   - Bugs in progress
   - Identified blockers
   - Next steps

## Classification Criteria

### Severity (Technical Impact):
- **S1 - Critical:** System unusable
- **S2 - High:** Main functionality affected
- **S3 - Medium:** Secondary functionality affected
- **S4 - Low:** Cosmetic/trivial errors

### Priority (Business Value):
- **P1 - Immediate:** Urgent correction
- **P2 - High:** Next release
- **P3 - Medium:** Future releases
- **P4 - Low:** Optional

### Complexity (Technical Effort):
- **C1 - Simple:** Hours
- **C2 - Medium:** Days
- **C3 - Complex:** Weeks

## Step-by-Step Process

### 1. Pre-Triage (Async)
Before the formal meeting:
- QA reproduces and validates the bug
- Fills in basic information
- Attaches relevant prints/logs
- Proposes initial classification

### 2. Synchronous Triage
During the meeting:
- QA presents bug briefly
- PO/Tech Lead discuss priority/complexity
- Decision recorded
- Assignment made

### 3. Post-Triage
After the meeting:
- Update status in system
- Notify assigned developer
- Schedule follow-up if needed

## Analysis Template

```markdown
## Bug #12345 - Error when finalizing checkout

**Summary:** User receives timeout when clicking "Complete Purchase"

**Reproduction:**
1. Add product to cart
2. Go to checkout
3. Fill in valid data
4. Click "Complete Purchase"
5. Timeout after 30 seconds

**Impact:**
- Severity: S1 - Critical (blocks sale)
- Affected users: 15% of purchase attempts
- Impacted metric: Checkout conversion

**Proposed Classification:**
- Priority: P1 - Immediate
- Complexity: C2 - Medium

**Assignment:** Dev John Silva
**Deadline:** 24 hours for initial analysis
```

## Tools and Systems

### Tracking System:
- **Jira:** Custom fields for triage
- **Azure DevOps:** Tags and work areas
- **GitHub Issues:** Labels and milestones

### Important Metrics:
- Average time to triage
- % of reclassified bugs
- Resolution rate on time
- Stakeholder satisfaction

## Common Mistakes

❌ **Too long sessions:** Loss of focus and productivity
❌ **Inappropriate participants:** Decisions without context
❌ **Lack of preparation:** Wasted time
❌ **Unclear criteria:** Inconsistent decisions
❌ **Not documenting decisions:** Later conflicts

## Best Practices

✅ **Maintain fixed agenda:** Consistency generates predictability
✅ **Prepare beforehand:** Maximize meeting time
✅ **Have clear criteria:** Everyone knows the rules
✅ **Record decisions:** Transparency and accountability
✅ **Review periodically:** Continuously improve process

## Efficient Triage Checklist

- [ ] Bugs reproduced and documented
- [ ] Right participants in the room
- [ ] Clear classification criteria
- [ ] Time controlled per item
- [ ] Decisions recorded immediately
- [ ] Assignments communicated
- [ ] Follow-up scheduled if needed

## Special Cases

### Duplicate Bugs:
- Close as duplicate
- Link to original bug
- Transfer votes/comments

### Non-Reproducible Bugs:
- Request more information
- Try in different environments
- Classify as "needs info"

### Out-of-Scope Bugs:
- Redirect to appropriate team
- Explain rejection reason
- Keep record for future patterns

## Conclusion

A well-structured bug triage process is like a circulatory system for quality: it ensures that the right problems reach the right people at the right time. The key is simplicity, consistency, and communication.

📚 **Want complete templates?** Check out our [triage process](../../modelos/README.md#processo-de-triage) and [practical exercises](../../exercicios/pleno.md#triagem-de-bugs).

#QA #BugTriage #Process #SoftwareTesting #Teamwork