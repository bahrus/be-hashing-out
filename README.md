# be-hashing-out

*be-hashing-out* can't help but long for the the brevity and sorcery on [display here](https://www.w3schools.com/TAGs/tag_output.asp):

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
     <input type=range id=a name=a value=50>
    +<input type=number id=b name=b value=25>
    =<output name=result for="a b"></output>
</form>
```


 (formerly also on MDN, but MDN abandoned simplicity for seemingly nonce-sensical security reasons (perhaps I'm wrong, thinking this out, which is what this repo is currently).

 Due to a lack of -- I'm not sure what -- the platform engineers have apparently failed to find a way to support brevity like this, even for trusted content coming from the host -- i.e. most "minimal" security measures throw the baby out with the bathwater, blocking our ability to do this (sigh).  How could they have supported it?  I *think* by allowing the nonce / hash attribute to apply to the parent element that contains inline scripts.  Maybe that was looked at and found problematic, who knows?  All I know is it is deeply unfortunate, and it appears to be resulting in solutions adopting makeshift handler syntax that is probably just as vulnerable to similar attacks as the native inline handlers are, only reduced by lack of widespread adoption.  And not solving this problem appears to me to driving a stake through the idea of progressive enhancement.

 ## Security concerns - Nonce in userland?

Suppose the (ShadowDOM) root node got assigned a GUID (private key) that can only be read by already permissioned  JavaScript. 

In order to activate the script (in this case, compile the event handler), this library needs to read that private key, which can only be done if JavaScript is activated.  The element with the inline script has to have: 1)  an id and 2) an attribute -- hash-ish ? that is the digest of the id.  If and only if that passes does the inline script get compiled. 