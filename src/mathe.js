module.exports = class MathE{
    static gcd(a,b){

          if (b == 0) return a;
          return MathE.gcd(b, a % b);   
    }

    static reverse(x, y,length = y, s1 = 1, s2 = 0, t1 = 0, t2 = 1){
            let q = Math.floor(x/y),
            s1copy = s1,
            t1copy = t1;

            if(x % y === 0){
                if(s2 < 0) s2 += length
                if(t2 < 0) t2 += length
                // if(y === 1 && (x * s2 % length) === 1) return s2
                // if(y === 1 && (x * t2 % length) === 1) return t2
                return {gcd: y, s: s2, t: t2} 
            }else{
                return MathE.reverse(y, x % y, length,s1 = s2, s2=s1copy-q*s2, t1=t2, t2=t1copy-q*t2);      
            } 
    }
    static linearСomparison(a,b,n){


        if(a < 0) a += n
        if(b < 0) b += n

        let d = MathE.gcd(a,n)
        
       

        if(d === 1){
            return  (MathE.reverse(a,n).s * b) % n < 0 ? ((MathE.reverse(a,n).s * b) % n) + n : (MathE.reverse(a,n).s * b) % n
        }

        if( b % d !== 0){
            return undefined
        } else{
            
            let result = [],[a1, b1, n1] = [a / d, b / d , n / d]
           
            let x0 = (MathE.reverse(a1,n1).s * b1)
            
			for(let i = 0; i < d; i++){
                result.push((x0 + (i * n1)))
            }
            return result
        }
    }

    static getBValue(y,x,a,m){
        let b = (y - (a * x )) % m
        return b < 0 ? b += m : b
    }
}