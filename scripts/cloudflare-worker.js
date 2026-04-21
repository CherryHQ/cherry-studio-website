addEventListener('scheduled', event => {
  event.waitUntil(handleSchedule());
});

// For testing via direct HTTP requests
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const result = await handleSchedule();
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleSchedule() {
  console.log("Starting scheduled data processing...");

  // Step 1: Fetch all submissions from cherry_css_pr
  const submissions = await fetchSubmissions();
  console.log(`Fetched ${submissions.length} submissions`);

  // Step 2: Group submissions by pass value
  const groupedSubmissions = groupSubmissionsByPass(submissions);

  // Step 3: Process each group
  const results = {
    truePass: { processed: 0, errors: [] },
    falsePass: { processed: 0, errors: [] }
  };

  // Process pass=true submissions (post to display table, then delete)
  if (groupedSubmissions.true.length > 0) {
    console.log(`Processing ${groupedSubmissions.true.length} approved submissions`);
    const trueResult = await processApprovedSubmissions(groupedSubmissions.true);
    results.truePass = trueResult;
  }

  // Process pass=false submissions (delete submissions and files)
  if (groupedSubmissions.false.length > 0) {
    console.log(`Processing ${groupedSubmissions.false.length} rejected submissions`);
    const falseResult = await processRejectedSubmissions(groupedSubmissions.false);
    results.falsePass = falseResult;
  }

  console.log("Data processing completed");
  return {
    timestamp: new Date().toISOString(),
    stats: {
      totalProcessed: submissions.length,
      pending: groupedSubmissions.null.length,
      approved: {
        count: groupedSubmissions.true.length,
        processed: results.truePass.processed,
        errors: results.truePass.errors.length
      },
      rejected: {
        count: groupedSubmissions.false.length,
        processed: results.falsePass.processed,
        errors: results.falsePass.errors.length
      }
    },
    details: results
  };
}

async function fetchSubmissions() {
  const response = await fetch('https://data1.cherry-ai.com/items/cherry_css_pr');

  if (!response.ok) {
    throw new Error(`Failed to fetch submissions: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}

function groupSubmissionsByPass(submissions) {
  const result = {
    'true': [],
    'false': [],
    'null': []
  };

  for (const submission of submissions) {
    if (submission.pass === true) {
      result.true.push(submission);
    } else if (submission.pass === false) {
      result.false.push(submission);
    } else {
      // pass is null or undefined
      result.null.push(submission);
    }
  }

  return result;
}

async function processApprovedSubmissions(approvedSubmissions) {
  const result = { processed: 0, errors: [] };

  if (approvedSubmissions.length === 0) {
    return result;
  }

  try {
    // Prepare submissions for the display table by filtering out unnecessary fields
    const displaySubmissions = approvedSubmissions.map(submission => {
      // Create a copy of the submission and remove fields that should not be included
      const { id, pass, date_created, date_updated, ...displaySubmission } = submission;
      return displaySubmission;
    });

    // Post to display table
    const postResponse = await fetch('https://data1.cherry-ai.com/items/cherry_css', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer y8j8uycl07xwSkyrssHCRd7nIecUeRwC',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(displaySubmissions)
    });

    if (!postResponse.ok) {
      throw new Error(`Failed to post to display table: ${postResponse.status} ${postResponse.statusText}`);
    }

    // Delete the successfully posted submissions from the submission table
    const submissionIds = approvedSubmissions.map(sub => sub.id);
    const deleteResponse = await fetch('https://data1.cherry-ai.com/items/cherry_css_pr', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer y8j8uycl07xwSkyrssHCRd7nIecUeRwC',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionIds)
    });

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete processed submissions: ${deleteResponse.status} ${deleteResponse.statusText}`);
    }

    result.processed = approvedSubmissions.length;
  } catch (error) {
    console.error("Error processing approved submissions:", error);
    result.errors.push(error.message);
  }

  return result;
}

async function processRejectedSubmissions(rejectedSubmissions) {
  const result = { processed: 0, errors: [] };

  if (rejectedSubmissions.length === 0) {
    return result;
  }

  try {
    // Collect files to delete
    const filesToDelete = [];
    for (const submission of rejectedSubmissions) {
      if (submission.light_pic) {
        filesToDelete.push(submission.light_pic);
      }
      if (submission.dark_pic) {
        filesToDelete.push(submission.dark_pic);
      }
    }

    // Delete files if there are any
    if (filesToDelete.length > 0) {
      const deleteFilesResponse = await fetch('https://data1.cherry-ai.com/files', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer y8j8uycl07xwSkyrssHCRd7nIecUeRwC',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filesToDelete)
      });

      if (!deleteFilesResponse.ok) {
        throw new Error(`Failed to delete files: ${deleteFilesResponse.status} ${deleteFilesResponse.statusText}`);
      }
    }

    // Delete the rejected submissions
    const submissionIds = rejectedSubmissions.map(sub => sub.id);
    const deleteSubmissionsResponse = await fetch('https://data1.cherry-ai.com/items/cherry_css_pr', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer y8j8uycl07xwSkyrssHCRd7nIecUeRwC',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionIds)
    });

    if (!deleteSubmissionsResponse.ok) {
      throw new Error(`Failed to delete rejected submissions: ${deleteSubmissionsResponse.status} ${deleteSubmissionsResponse.statusText}`);
    }

    result.processed = rejectedSubmissions.length;
  } catch (error) {
    console.error("Error processing rejected submissions:", error);
    result.errors.push(error.message);
  }

  return result;
}