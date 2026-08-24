const masterLayout = ({
  title = "His Masterpiece",
  heading = "",
  greeting = "",
  content = "",
  buttonText = "",
  buttonUrl = "",
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>

</head>

<body
style="
margin:0;
padding:0;
background:#F5F2EC;
font-family:Arial,Helvetica,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="background:#F5F2EC;padding:40px 0;">

<tr>

<td align="center">

<table
width="680"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
overflow:hidden;
border-radius:8px;
">

<!-- HEADER -->

<tr>

<td
align="center"
style="
background:#183425;
padding:45px 40px;
">

<h1
style="
margin:0;
color:#ffffff;
font-size:36px;
letter-spacing:2px;
font-family:Georgia,serif;
">

His Masterpiece

</h1>

<p
style="
margin-top:12px;
color:#DCCB9A;
font-size:14px;
letter-spacing:4px;
text-transform:uppercase;
">

Luxury Home Textiles

</p>

</td>

</tr>

<!-- BODY -->

<tr>

<td
style="
padding:50px;
">

<h2
style="
margin:0 0 25px;
font-size:30px;
color:#183425;
font-family:Georgia,serif;
">

${heading}

</h2>

${
greeting
? `
<p
style="
margin:0 0 25px;
font-size:16px;
line-height:28px;
color:#555;
">

${greeting}

</p>
`
: ""
}

<div
style="
font-size:16px;
line-height:30px;
color:#555;
">

${content}

</div>

${
buttonText
? `
<div
style="
margin-top:45px;
text-align:center;
">

<a
href="${buttonUrl}"
style="
display:inline-block;
background:#183425;
color:#ffffff;
text-decoration:none;
padding:16px 40px;
font-size:14px;
font-weight:bold;
letter-spacing:2px;
text-transform:uppercase;
border-radius:4px;
">

${buttonText}

</a>

</div>
`
: ""
}

</td>

</tr>

<!-- SUPPORT -->

<tr>

<td
style="
padding:35px 50px;
background:#FAF8F4;
border-top:1px solid #EEE6D9;
">

<p
style="
margin:0;
font-size:15px;
color:#555;
line-height:28px;
">

If you have any questions, simply reply to this email or contact our support team.

</p>

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
align="center"
style="
padding:40px;
background:#183425;
">

<p
style="
margin:0;
color:#ffffff;
font-size:18px;
font-family:Georgia,serif;
">

His Masterpiece

</p>

<p
style="
margin:12px 0;
color:#DCCB9A;
font-size:13px;
">

Luxury Home Textile Manufacturer

</p>

<p
style="
margin:0;
color:#cccccc;
font-size:12px;
line-height:24px;
">

© ${new Date().getFullYear()} His Masterpiece

<br>

All Rights Reserved.

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

export default masterLayout;