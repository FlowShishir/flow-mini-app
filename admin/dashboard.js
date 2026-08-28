/* =========================================================
   JUNNU GIFT — ADMIN DASHBOARD
   Supabase Database + Storage
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const MEDIA_BUCKET = "media";


/* =========================================================
   DOM
   ========================================================= */

const logoutBtn =
  document.getElementById("logoutBtn");

const globalStatus =
  document.getElementById("globalStatus");

const contentEditor =
  document.getElementById("contentEditor");

const mediaList =
  document.getElementById("mediaList");

const imageInput =
  document.getElementById("imageInput");

const videoInput =
  document.getElementById("videoInput");

const voiceInput =
  document.getElementById("voiceInput");

const imageUploadBtn =
  document.getElementById("imageUploadBtn");

const videoUploadBtn =
  document.getElementById("videoUploadBtn");

const voiceUploadBtn =
  document.getElementById("voiceUploadBtn");

const imageStatus =
  document.getElementById("imageStatus");

const videoStatus =
  document.getElementById("videoStatus");

const voiceStatus =
  document.getElementById("voiceStatus");


/* =========================================================
   STATUS
   ========================================================= */

function showGlobalStatus(
  message,
  type = ""
){

  if(!globalStatus) return;

  globalStatus.textContent =
    message;

  globalStatus.className =
    "global-status";

  if(type){

    globalStatus.classList.add(type);

  }

}


/* =========================================================
   AUTH CHECK
   ========================================================= */

async function checkAdmin(){

  try{

    const {
      data,
      error
    } =
    await supabaseClient.auth.getUser();


    if(error){

      throw error;

    }


    if(!data || !data.user){

      window.location.href =
        "index.html";

      return false;

    }


    return true;

  }catch(error){

    console.error(
      "Auth error:",
      error
    );

    window.location.href =
      "index.html";

    return false;

  }

}


/* =========================================================
   LOGOUT
   ========================================================= */

if(logoutBtn){

  logoutBtn.addEventListener(
    "click",
    async () => {

      logoutBtn.disabled = true;

      logoutBtn.textContent =
        "Logging out...";


      const {
        error
      } =
      await supabaseClient.auth.signOut();


      if(error){

        console.error(error);

        logoutBtn.disabled = false;

        logoutBtn.textContent =
          "Logout";

        showGlobalStatus(
          "❌ Logout করা যায়নি।",
          "error"
        );

        return;

      }


      window.location.href =
        "index.html";

    }
  );

}


/* =========================================================
   LOAD CONTENT
   ========================================================= */

async function loadContent(){

  if(!contentEditor) return;


  contentEditor.innerHTML = `
    <div class="loading">
      🔄 Content loading...
    </div>
  `;


  const {
    data,
    error
  } =
  await supabaseClient
    .from("site_content")
    .select("*")
    .order("id", {
      ascending:true
    });


  if(error){

    console.error(error);

    contentEditor.innerHTML = `
      <div class="error-box">
        ❌ Content load করা যায়নি।
        <br>
        ${escapeHtml(error.message)}
      </div>
    `;

    return;

  }


  if(!data || data.length === 0){

    contentEditor.innerHTML = `
      <div class="empty-box">
        এখনো কোনো content নেই।
      </div>
    `;

    return;

  }


  contentEditor.innerHTML = "";


  data.forEach(item => {

    const row =
      document.createElement("div");

    row.className =
      "content-row";


    row.innerHTML = `

      <div class="content-key">

        <label>
          Content Key
        </label>

        <input
          type="text"
          value="${escapeAttribute(item.content_key || "")}"
          disabled
        >

      </div>


      <div class="content-value">

        <label>
          Content
        </label>

        <textarea
          rows="4"
          data-id="${item.id}"
        >${escapeHtml(item.content_value || "")}</textarea>

      </div>


      <button
        class="save-content-btn"
        data-id="${item.id}"
      >
        💾 Save
      </button>

    `;


    contentEditor.appendChild(row);

  });


  document
    .querySelectorAll(".save-content-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          saveContent(
            button.dataset.id,
            button
          );

        }
      );

    });

}


/* =========================================================
   SAVE CONTENT
   ========================================================= */

async function saveContent(
  id,
  button
){

  const textarea =
    document.querySelector(
      `textarea[data-id="${CSS.escape(id)}"]`
    );


  if(!textarea) return;


  const value =
    textarea.value;


  button.disabled = true;

  button.textContent =
    "Saving...";


  const {
    error
  } =
  await supabaseClient
    .from("site_content")
    .update({
      content_value:value
    })
    .eq("id", id);


  if(error){

    console.error(error);

    button.disabled = false;

    button.textContent =
      "💾 Save";

    showGlobalStatus(
      "❌ Content save করা যায়নি।",
      "error"
    );

    return;

  }


  button.disabled = false;

  button.textContent =
    "✅ Saved";


  showGlobalStatus(
    "✅ Content successfully updated!",
    "success"
  );


  setTimeout(() => {

    button.textContent =
      "💾 Save";

  }, 2000);

}


/* =========================================================
   FILE UPLOAD
   ========================================================= */

async function uploadFile(
  input,
  statusElement,
  folder
){

  if(!input || !statusElement) return;


  const file =
    input.files[0];


  if(!file){

    statusElement.textContent =
      "⚠️ আগে একটা file select করো।";

    return;

  }


  /*
    Basic size limits.
  */

  const maxImageSize =
    15 * 1024 * 1024;

  const maxVideoSize =
    100 * 1024 * 1024;

  const maxAudioSize =
    30 * 1024 * 1024;


  if(
    folder === "images" &&
    file.size > maxImageSize
  ){

    statusElement.textContent =
      "❌ Image 15MB-এর বেশি হতে পারবে না।";

    return;

  }


  if(
    folder === "videos" &&
    file.size > maxVideoSize
  ){

    statusElement.textContent =
      "❌ Video 100MB-এর বেশি হতে পারবে না।";

    return;

  }


  if(
    folder === "voice" &&
    file.size > maxAudioSize
  ){

    statusElement.textContent =
      "❌ Voice 30MB-এর বেশি হতে পারবে না।";

    return;

  }


  statusElement.textContent =
    "🔄 Upload হচ্ছে...";


  /*
    Unique filename.
  */

  const extension =
    getFileExtension(file.name);


  const safeName =
    createSafeFileName(file.name);


  const uniqueName =
    `${Date.now()}-${crypto.randomUUID()}-${safeName}${extension}`;


  const filePath =
    `${folder}/${uniqueName}`;


  try{

    const {
      error
    } =
    await supabaseClient
      .storage
      .from(MEDIA_BUCKET)
      .upload(
        filePath,
        file,
        {
          cacheControl:"3600",
          upsert:false
        }
      );


    if(error){

      throw error;

    }


    statusElement.textContent =
      "✅ Upload successful!";


    showGlobalStatus(
      `✅ ${folder} upload successful!`,
      "success"
    );


    input.value = "";


    loadMedia();


  }catch(error){

    console.error(
      "Upload error:",
      error
    );


    statusElement.textContent =
      `❌ Upload failed: ${error.message}`;

  }

}


/* =========================================================
   IMAGE UPLOAD
   ========================================================= */

if(imageUploadBtn){

  imageUploadBtn.addEventListener(
    "click",
    () => {

      uploadFile(
        imageInput,
        imageStatus,
        "images"
      );

    }
  );

}


/* =========================================================
   VIDEO UPLOAD
   ========================================================= */

if(videoUploadBtn){

  videoUploadBtn.addEventListener(
    "click",
    () => {

      uploadFile(
        videoInput,
        videoStatus,
        "videos"
      );

    }
  );

}


/* =========================================================
   VOICE UPLOAD
   ========================================================= */

if(voiceUploadBtn){

  voiceUploadBtn.addEventListener(
    "click",
    () => {

      uploadFile(
        voiceInput,
        voiceStatus,
        "voice"
      );

    }
  );

}


/* =========================================================
   LOAD STORAGE FILES
   ========================================================= */

async function loadMedia(){

  if(!mediaList) return;


  mediaList.innerHTML = `
    <div class="loading">
      🔄 Media loading...
    </div>
  `;


  const folders = [
    "images",
    "videos",
    "voice",
    "couple"
  ];


  let allFiles = [];


  try{

    for(
      const folder of folders
    ){

      const {
        data,
        error
      } =
      await supabaseClient
        .storage
        .from(MEDIA_BUCKET)
        .list(folder, {
          limit:100,
          offset:0,
          sortBy:{
            column:"created_at",
            order:"desc"
          }
        });


      if(error){

        console.warn(
          `Could not load ${folder}:`,
          error
        );

        continue;

      }


      if(data){

        data
          .filter(file => file.name)
          .forEach(file => {

            allFiles.push({
              ...file,
              folder
            });

          });

      }

    }


    renderMedia(allFiles);


  }catch(error){

    console.error(error);

    mediaList.innerHTML = `
      <div class="error-box">
        ❌ Media load করা যায়নি।
      </div>
    `;

  }

}


/* =========================================================
   RENDER MEDIA
   ========================================================= */

function renderMedia(files){

  if(!mediaList) return;


  if(!files || files.length === 0){

    mediaList.innerHTML = `
      <div class="empty-box">
        📁 এখনো কোনো media upload করা হয়নি।
      </div>
    `;

    return;

  }


  mediaList.innerHTML = "";


  files.forEach(file => {

    const path =
      `${file.folder}/${file.name}`;


    const {
      data
    } =
    supabaseClient
      .storage
      .from(MEDIA_BUCKET)
      .getPublicUrl(path);


    const publicUrl =
      data.publicUrl;


    const card =
      document.createElement("div");

    card.className =
      "media-item";


    let preview = "";


    if(file.folder === "images"){

      preview = `
        <img
          src="${escapeAttribute(publicUrl)}"
          alt=""
          loading="lazy"
        >
      `;

    }else if(file.folder === "videos"){

      preview = `
        <div class="media-placeholder">
          🎬
        </div>
      `;

    }else if(file.folder === "voice"){

      preview = `
        <div class="media-placeholder">
          🎙️
        </div>
      `;

    }else{

      preview = `
        <div class="media-placeholder">
          💕
        </div>
      `;

    }


    card.innerHTML = `

      <div class="media-preview">
        ${preview}
      </div>


      <div class="media-info">

        <strong>
          ${escapeHtml(file.name)}
        </strong>

        <small>
          ${escapeHtml(file.folder)}
        </small>

      </div>


      <div class="media-actions">

        <a
          href="${escapeAttribute(publicUrl)}"
          target="_blank"
          rel="noopener"
          class="view-media-btn"
        >
          👀 View
        </a>


        <button
          class="delete-media-btn"
          data-path="${escapeAttribute(path)}"
        >
          🗑️ Delete
        </button>

      </div>

    `;


    mediaList.appendChild(card);

  });


  document
    .querySelectorAll(".delete-media-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          deleteMedia(
            button.dataset.path,
            button
          );

        }
      );

    });

}


/* =========================================================
   DELETE MEDIA
   ========================================================= */

async function deleteMedia(
  path,
  button
){

  const confirmed =
    confirm(
      "এই file-টি permanently delete করতে চাও?"
    );


  if(!confirmed) return;


  button.disabled = true;

  button.textContent =
    "Deleting...";


  const {
    error
  } =
  await supabaseClient
    .storage
    .from(MEDIA_BUCKET)
    .remove([
      path
    ]);


  if(error){

    console.error(error);

    button.disabled = false;

    button.textContent =
      "🗑️ Delete";


    showGlobalStatus(
      "❌ File delete করা যায়নি।",
      "error"
    );

    return;

  }


  showGlobalStatus(
    "✅ File deleted successfully!",
    "success"
  );


  loadMedia();

}


/* =========================================================
   HELPERS
   ========================================================= */

function getFileExtension(
  filename
){

  const lastDot =
    filename.lastIndexOf(".");


  if(lastDot === -1){

    return "";

  }


  return filename
    .substring(lastDot)
    .toLowerCase();

}


function createSafeFileName(
  filename
){

  const lastDot =
    filename.lastIndexOf(".");


  let name =
    lastDot === -1
      ? filename
      : filename.substring(
          0,
          lastDot
        );


  name =
    name
      .normalize("NFKD")
      .replace(
        /[^\w\s-]/g,
        ""
      )
      .trim()
      .replace(
        /\s+/g,
        "-"
      )
      .replace(
        /-+/g,
        "-"
      );


  if(!name){

    name =
      "file";

  }


  return name
    .substring(0,80);

}


function escapeHtml(
  value
){

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function escapeAttribute(
  value
){

  return escapeHtml(value);

}


/* =========================================================
   INITIALIZE DASHBOARD
   ========================================================= */

async function initializeDashboard(){

  const authenticated =
    await checkAdmin();


  if(!authenticated){

    return;

  }


  showGlobalStatus(
    "🔄 Dashboard loading..."
  );


  await loadContent();

  await loadMedia();


  showGlobalStatus(
    "✅ Dashboard ready!",
    "success"
  );

}


initializeDashboard();
