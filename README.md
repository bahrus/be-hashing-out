# be-hashing-out [TODO]

Elevate the trust level of HTML Fragments.

## The catch-22 of web development

>  Enabling unfettered JavaScript unintentionally in the browser can be dangerous, as it allows XSS attacks.  Therefore, (in addition to performance and accessibility reasons), use less JavaScript, more HTML.  However, if the HTML contains any explicit JavaScript in the event handlers, you're back to square one since the browser won't support you with nonce/hash, and script tags can't identify where in the DOM it is.  So.... just give up and write the whole thing in JavaScript.

*be-hashing-out* can't help but long for the the brevity and sorcery on [display here](https://www.w3schools.com/TAGs/tag_output.asp):

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
     <input type=range id=a name=a value=50>
    +<input type=number id=b name=b value=25>
    =<output name=result for="a b"></output>
</form>
```


 This example was also formerly shared with MDN, but MDN abandoned simplicity for seemingly nonce-sensical security reasons (perhaps I'm wrong, thinking this out, which is what this repo is currently).

 Due to a lack of -- I'm not sure what -- the platform engineers have apparently failed to find a way to support brevity like this, even for trusted content coming from the host -- i.e. most "minimal" security measures throw the baby out with the bathwater, blocking our ability to do this (sigh).  How could they have supported it?  I *think* by allowing the nonce / hash attribute to apply to the parent element that contains inline scripts.  Maybe that was looked at and found problematic, who knows?  All I know is it is deeply unfortunate, and it appears to be resulting in solutions adopting makeshift handler syntax that is probably just as vulnerable to similar attacks as the native inline handlers are, only reduced by lack of widespread adoption.  And not solving this problem appears to me to driving a stake through the idea of progressive enhancement.

 ## Security concerns - Nonce in userland?

 ### Step 1

 ```html
 <fetch-for be-hashing-out
href=https://cors-anywhere.herokuapp.com/https://www.theonion.com/ 
as=html shadow=open ></fetch-for>
 ```

What this does:  Since the value of the attribute is empty, it emits an error with the Crypto.subtle.digest value based on the outerHTML (excluding the be-hashing-out attribute) to the console.

In this case, say the value is:  63c93d6c1dbef1929c0320ef1c4396cce1e0485ec743fe877b12e35a66b9f228

### Step 2

```html
<script type=module>
    import {register} from 'be-hashing-out/register.js';
    register('63c93d6c1dbef1929c0320ef1c4396cce1e0485ec743fe877b12e35a66b9f228');
</script>

<fetch-for be-hashing-out=63c93d6c1dbef1929c0320ef1c4396cce1e0485ec743fe877b12e35a66b9f228
href=https://cors-anywhere.herokuapp.com/https://www.theonion.com/ 
as=html shadow=open ></fetch-for>
```

What *be-hashing-out* does:

1.  Gets the OuterHTML string of the element it adorns.
2.  Removes the "be-hashing-out=63c93d6c1dbef1929c0320ef1c4396cce1e0485ec743fe877b12e35a66b9f228" part out of the string.
3.  Calculates the digest.
4.  Verifies that the value was registered.
5.  Sets property oFetchFor.beHashingOut.isRegistered to true if the digests match, otherwise false.
6.  If false, emits a console error again.